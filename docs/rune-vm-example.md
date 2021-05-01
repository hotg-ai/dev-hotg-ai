---
title: Rune VM Example
sidebar_label: Example
---
## CMake File

Sample setup of a cmake file.

```cpp title="CMakeLists.txt"
cmake_minimum_required(VERSION 3.15)

# Sources & Headers
set(
    SOURCES
)

set(
    HEADERS
)

macro(rune_vm_add_example example_name)
    # Add executable
    set(RUNE_VM_EXAMPLE_TARGET rune_vm_${example_name})
    add_executable(${RUNE_VM_EXAMPLE_TARGET} ${CMAKE_CURRENT_SOURCE_DIR}/${example_name}.cpp ${SOURCES} ${HEADERS})

    # Link dependencies
    target_link_libraries(
        ${RUNE_VM_EXAMPLE_TARGET}
        PRIVATE
        ${RUNE_VM_TARGET_NAME})
endmacro(rune_vm_add_example)

rune_vm_add_example(example0)
```

## Example

Source code for `example0` called in `CMakeLists.txt`

```cpp title="example0.cpp"
//
// Created by Kirill Delimbetov - github.com/delimbetov - on 30.04.2021.
// Copyright (c) HAMMER OF THE GODS INC. - hotg.ai
//

#include <array>
#include <iostream>
#include <thread>
#include <vector>
#include <rune_vm/RuneVm.hpp>

// All logs are rerouted to the user-provided logger
struct StdoutLogger : public rune_vm::ILogger {
    void log(
        const rune_vm::Severity severity,
        const std::string& module,
        const std::string& message) const noexcept final {
        try {
            std::cout << std::string(rune_vm::severityToString(severity)) + "@[" + module + "]: " + message +"\n";
        } catch(...) {
            // recover somehow if you want
        }
    }
};

// Each rune needs one or more capability. User provides that capability via delegates
// Single delegate might implement any amount of capabilities
template<typename TDelegate, rune_vm::capabilities::Capability... capabilities>
struct BaseDelegate : public rune_vm::capabilities::IDelegate {
    BaseDelegate(const rune_vm::ILogger::CPtr& logger, const std::string& name)
        : m_log(logger, name)
        , m_supportedCapabilities(g_supportedCapabilities.begin(), g_supportedCapabilities.end()) {}

protected:
    static constexpr auto g_supportedCapabilities = std::array{capabilities...};

    // rune_vm::capabilities::IDelegate
    [[nodiscard]] TCapabilitiesSet getSupportedCapabilities() const noexcept final {
        m_log.log(rune_vm::Severity::Debug, "getSupportedCapabilities called");
        return m_supportedCapabilities;
    }

    [[nodiscard]] bool requestCapability(
        const rune_vm::capabilities::Capability capability,
        const rune_vm::capabilities::TId newCapabilityId) noexcept final {
        m_log.log(rune_vm::Severity::Debug, "requestCapability called");
        if(m_supportedCapabilities.count(capability) == 0)
            return false;

        return true;
    }

    [[nodiscard]] bool requestCapabilityParamChange(
        const rune_vm::capabilities::TId capabilityId,
        const rune_vm::capabilities::TKey& key,
        const rune_vm::capabilities::Parameter& parameter) noexcept override {
        m_log.log(rune_vm::Severity::Debug, "requestCapabilityParamChange called");
        return true;
    }

    [[nodiscard]] bool requestRuneInputFromCapability(
        const rune_vm::DataView<uint8_t> buffer,
        const rune_vm::capabilities::TId capabilityId) noexcept final {
        m_log.log(rune_vm::Severity::Debug, "requestRuneInputFromCapability called");
        // check if you have input ready, if no return false
        // ...
        //

        // null args should never be passed to the delegates, but just in case
        if(!buffer.m_data)
            return false;

        // write input to provided buffer - sizes must match
        // std::memcpy(buffer.m_data, some_input_data, buffer.m_size);

        return true;
    }

    // data
    rune_vm::LoggingModule m_log;
    TCapabilitiesSet m_supportedCapabilities;
};

struct ImageDelegate : public BaseDelegate<ImageDelegate, rune_vm::capabilities::Capability::Image> {
    ImageDelegate(const rune_vm::ILogger::CPtr& logger)
        : BaseDelegate(logger, "ImageDelegate") {}

private:
    // rune_vm::capabilities::IDelegate
    [[nodiscard]] bool requestCapabilityParamChange(
        const rune_vm::capabilities::TId capabilityId,
        const rune_vm::capabilities::TKey& key,
        const rune_vm::capabilities::Parameter& parameter) noexcept final {
        m_log.log(rune_vm::Severity::Debug, "requestCapabilityParamChange called");
        // check if the param is known to us
        if(key == "width") {
            // check if param type is expected
            if(!std::holds_alternative<int32_t>(parameter.m_data))
                return false;

            const auto& width = std::get<int32_t>(parameter.m_data);

            // check if param value makes sense
            // if it doesn't, deny param change request
            if(width <= 0 || width > 2000)
                return false;

            // write update param to the data source
            // ...
            // report succesfull update (or don't, if it has failed for some reason)
            return true;
        }
//        else ...

        return false;
    }
};

struct MultiCapDelegate : public BaseDelegate<
    MultiCapDelegate,
    rune_vm::capabilities::Capability::Accel,
    rune_vm::capabilities::Capability::Image,
    rune_vm::capabilities::Capability::Raw> {
    MultiCapDelegate(const rune_vm::ILogger::CPtr& logger)
        : BaseDelegate(logger, "MultiCapDelegate") {}
};

int main(int argc, char** argv) {
    if(argc < 2) {
        std::cout << "example needs arguments: paths to runes";
        return EXIT_FAILURE;
    }

    // read input args
    auto runePaths = std::vector<std::string>();

    for(auto idx = 1; idx < argc; ++idx)
        runePaths.emplace_back(argv[idx]);

    // create rune_vm context
    // logger is kept alive as shared_ptr inside rune_vm objects
    auto logger = std::make_shared<StdoutLogger>();
    // engine, runtime and rune objects must be kept alive by the user, so don't release shared_ptrs
    auto engine = rune_vm::createEngine(
        logger,
        rune_vm::WasmBackend::Wasm3,
        std::max<rune_vm::TThreadCount>(1, std::thread::hardware_concurrency() - 1));
    auto runtime = engine->createRuntime();

    // load runes
    auto runes = std::vector<rune_vm::IRune::Ptr>();

    for(const auto& runePath: runePaths) {
        // create delegate objects
        // they should not be shared between runes
        //
        // Also NEVER put rune_vm objects shared_ptrs inside the delegate - you might create reference loop this way
        auto imageDelegate = std::make_shared<ImageDelegate>(logger);
        auto multiDelegate = std::make_shared<MultiCapDelegate>(logger);

        // load rune
        auto rune = runtime->loadRune({imageDelegate, multiDelegate}, runePath);

        runes.push_back(std::move(rune));
    }

    // run runes
    // in this example input is not provided. In real life use one would have to update delegates before each Rune::call invokation
    for(auto& rune: runes) {
        for(auto iter = 0; iter < 5; ++iter) {
            auto result = rune->call();

            logger->log(rune_vm::Severity::Info, "example0.cpp", "Rune result: " + result->asJson());
        }
    }

    logger->log(rune_vm::Severity::Info, "example0.cpp", "Valid exit");
    return EXIT_SUCCESS;
}
```
