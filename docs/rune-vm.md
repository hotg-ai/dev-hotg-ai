---
title: Rune VM Guide
sidebar_label: Guide
---
## Overview

C++ SDK for running Runes.

<!-- ## Table of Contents

- [Overview](#overview)
- [Table of Contents](#table-of-contents)
- [Build](#build)
  * [Prerequisites](#prerequisites)
    + [Android](#android)
    + [iOS](#ios)
  * [Guide](#guide)
    + [Prepare repo](#prepare-repo)
    + [Configure via cmake](#configure-via-cmake)
      - [Common options](#common-options)
      - [Mac or other host system](#mac-or-other-host-system)
      - [Android](#android-1)
      - [iOS](#ios-1)
    + [Build](#build-1)
    + [Install](#install)
    + [Test](#test)
- [Integration](#integration)
  * [iOS recommended flow](#ios-recommended-flow)
  * [Android recommended flow](#android-recommended-flow)
- [User guide](#user-guide)
  * [Main Rune abstractions](#main-rune-abstractions)
  * [Library abstractions](#library-abstractions)
  * [Examples](#examples)
  * [How to use](#how-to-use)
    + [Implement the logger](#implement-the-logger)
    + [Implement the delegates](#implement-the-delegates)
    + [Create the context objects](#create-the-context-objects)
    + [Load the Rune(-s)](#load-the-rune--s-)
    + [Run the Rune(-s)](#run-the-rune--s-) -->
  
## Build

Tested on macOS Big Sur 11.1.

### Prerequisites

- modern compiler with c++17 support (tested on Apple clang version 12.0.0 (clang-1200.0.32.29))
- cmake >= 3.15 (tested on 3.19.2)
- (optionally) tensorflow binary

#### Android

- Modern ndk (e.g. 23)

#### iOS

- Xcode

### Guide

#### Prepare repo

Cloning submodules might take some time as they fetch a lot of redundant data for things like tests.

```shell
git clone git@github.com:hotg-ai/rune_vm.git
cd rune_vm
git submodule update --init --recursive
```

#### Configure via cmake

##### Common options

Notable cmake options - for complete list use cmake gui app:

- RUNE_VM_TFLITE_EXTERNAL - ON if you wish to use external tensorflow binary, e.g. installed via Pod. In that case you will have to provide RUNE_VM_INFERENCE_TFLITE_INCLUDE_DIRS and RUNE_VM_INFERENCE_TFLITE_LIBRARIES too. OFF if you want tensorflow to be build as part of the project. OFF by default;
- RUNE_VM_BUILD_TESTS - ON if you wish to build rune vm tests. ON by default;
- CMAKE_BUILD_TYPE - set it to either Debug or Release;
- CMAKE_INSTALL_PREFIX - set to the location you wish the SDK to be installed to.
- CMAKE_TOOLCHAIN_FILE - toolchain file which specifies a lot of internal options like compiler or linker. Usually required if you do cross compilation e.g. for mobile platform.

##### Mac or other host system

```shell
PROJECT_DIR=$(pwd)
CONFIG_POSTFIX=rel
BUILD_DIR=build-$CONFIG_POSTFIX
mkdir $BUILD_DIR && cd $BUILD_DIR
cmake ../ \
    -DCMAKE_BUILD_TYPE=Release \
    -DCMAKE_INSTALL_PREFIX=$PROJECT_DIR/install-$CONFIG_POSTFIX
```

##### Android

:::note
Tests are not supported on Android.
:::

For details see https://developer.android.com/ndk/guides/cmake .

- ANDROID_ABI - what arch to build for. Should match with target device. Possible values: armeabi-v7a armeabi-v7a with NEON	- same as -DANDROID_ABI=armeabi-v7a -DANDROID_ARM_NEON=ON, arm64-v8a, x86, x86_64;
- ANDROID_NDK ;
- ANDROID_NATIVE_API_LEVEL ;
- ANDROID_STL ;
- ANDROID_TOOLCHAIN ;

Please pass path to NDK on your system to NDK_PATH variable in the script below. NDK version might vary based on availability in your environment.

```shell
PROJECT_DIR=$(pwd)
INSTALL_DIR=$(pwd)
ABI=arm64-v8a
CONFIG_POSTFIX=android-rel-$ABI
BUILD_DIR=build-$CONFIG_POSTFIX
mkdir -p $BUILD_DIR && cd $BUILD_DIR
NDK_PATH=/path_to_android_sdk_on_you_machine/ndk/21.1.6352462
cmake $PROJECT_DIR \
    -DTFLITE_C_BUILD_SHARED_LIBS=ON \
    -DRUNE_VM_BUILD_TESTS=OFF \
    -DRUNE_VM_BUILD_EXAMPLES=OFF \
    -DCMAKE_BUILD_TYPE=Release \
    -DCMAKE_INSTALL_PREFIX=$INSTALL_DIR/install-$CONFIG_POSTFIX \
    -DANDROID_ABI=arm64-v8a \
    -DANDROID_ARM_NEON=ON \
    -DANDROID_NDK=$NDK_PATH \
    -DANDROID_NATIVE_API_LEVEL=28 \
    -DANDROID_STL=c++_shared \
    -DANDROID_TOOLCHAIN=clang \
    -DCMAKE_TOOLCHAIN_FILE=$NDK_PATH/build/cmake/android.toolchain.cmake
```

##### iOS

:::note
Tests are not supported on iOS.
:::

If you use polly' toolchain, next env variables must be set:

- POLLY_IOS_DEVELOPMENT_TEAM must be set to the id of the team that will sign the binary. See https://stackoverflow.com/questions/18727894/how-can-i-find-my-apple-developer-team-id-and-team-agent-apple-id for details on how to find your id.
- POLLY_IOS_BUNDLE_IDENTIFIER - to the bundle identifier, e.g. "com.example.your_last_name_or_something".
iOS only supports external tensorflow at the moment. So you will have to specify DRUNE_VM_INFERENCE_TFLITE_* variables (see above for details). You should also specify PATH_TO_TFLITE_FRAMEWORK env variable if you wish to use script below.

```shell
PROJECT_DIR=$(pwd)
INSTALL_DIR=$(pwd)
CONFIG_POSTFIX=ios-rel
BUILD_DIR=build-$CONFIG_POSTFIX
mkdir -p $BUILD_DIR && cd $BUILD_DIR
export POLLY_IOS_DEVELOPMENT_TEAM="YOUR_TEAM_ID"
export POLLY_IOS_BUNDLE_IDENTIFIER="BUNDLE_ID"
export PATH_TO_TFLITE_FRAMEWORK="PATH_ON_YOUR_SYSTEM"
cmake $PROJECT_DIR \
    -GXcode \
    -DRUNE_VM_BUILD_TESTS=OFF \
    -DRUNE_VM_BUILD_EXAMPLES=OFF \
    -DCMAKE_BUILD_TYPE=Release \
    -DCMAKE_INSTALL_PREFIX=$INSTALL_DIR/install-$CONFIG_POSTFIX \
    -DCMAKE_TOOLCHAIN_FILE=$PROJECT_DIR/extern/polly/ios.cmake \
    -DRUNE_VM_TFLITE_EXTERNAL=ON \
    -DRUNE_VM_INFERENCE_TFLITE_INCLUDE_DIRS=$PATH_TO_TFLITE_FRAMEWORK/Headers \
    -DRUNE_VM_INFERENCE_TFLITE_LIBRARIES=$PATH_TO_TFLITE_FRAMEWORK/TensorFlowLiteC 
```

#### Build

Notes:

1. Tensorflow compilation via console tries to print pages for some reason. My console app - iTerm2 - blocks it after couple of requests, so if yours doesn't you may want to try it;
2. If BUILD_WORKERS_COUNT doesn't work on your platform, you may pass your count of cores or omit --parallel arg altogether;

```shell
BUILD_WORKERS_COUNT=$(nproc 2>/dev/null || sysctl -n hw.ncpu 2>/dev/null || getconf _NPROCESSORS_ONLN 2>/dev/null)
cmake --build ./ --target rune_vm --config Release --parallel $BUILD_WORKERS_COUNT
```

#### Install

```shell
cmake --build ./ --target install --config Release --parallel $BUILD_WORKERS_COUNT
```

#### Test

:::note
RUNE_VM_BUILD_TESTS must be enabled during cmake configuration for tests to work.
:::

```shell
./tests/rune_vm_tests
```

## Integration

Generally all you to do to use it is to link the rune_vm in your project. There are multiple options to do so:

- add it as cmake source dependency via add_subdirectory;
- build it (see [Build](#build)) and link as binary dependency;

Caveats:

- if you didn't build rune_vm with tensorflow inside for some reason, you will have to link your app with the tensorflow dynamic library or compile tensorflow into the app binary.

### iOS recommended flow

- Build static rune_vm with the script above;
- Link to all .a objects in your app via xcode project settings;
- Link to tensorflow framework you used to build rune_vm;
- Add objective-c++ layer to bind Swift to c++.

### Android recommended flow

- Build shared rune_vm with the script above;
- Add externalNativeBuild to the build.gradle of your app;
- Add some shared library target in the CMakeLists there;
- Add rune_vm prebuilt .so as imported library there, see [Android docs](https://developer.android.com/studio/projects/configure-cmake#add-other-library);
- Load shared library you created in the external native build cmake in the app code: ```System.loadLibrary("rune_vm_loader")```;
- Add jni layer to bind Kotlin/Java to c++.

## User guide

### Main Rune abstractions

- Rune - deserialized wasm library which provides useful AI functionality. On creation it requests required source of data (capability), optionally parametrizes it (e.g. Image capability might be parametrized with expected resolution);
- Capability - some device capability which Rune needs to work. One might think about it as some source of data for the Rune. E.g. it might be camera (images), accelerometer or random number generator;

### Library abstractions

- rune_vm::IEngine, rune_vm::IRuntime - context objects - generally you won't need to create them more than once;
- rune_vm::IRune - per Rune object which you will create via .rune file deserialization;
- rune_vm::capabilities::IDelegate - that's the interface to the library for most of capability-related stuff. One must implement it to provide some (or multiple) capability. One passes input to the Rune via this object;
- rune_vm::capabilities::IContext - one might query data from the Rune' context about currently allocated capabilities. Also, if you allocated capability earlier via IDelegate, you might retract it via this interface;
- rune_vm::ILogger - logger interface. Implement it to reroute all library logs to your app.

### Examples

The easiest way to understand the interface is to checkout [examples](rune-vm-example.md).

### How to use

#### Implement the logger

```cpp
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
```

#### Implement the delegates

You must provide the delegate for each capability your Rune needs. You might implement multiple capabilities via single delegate, or via multiple delegates each implementing single capability.

Delegate' callbacks are invoked when you load Rune or call IRune::call().

```cpp
struct AllInOneDelegate : public rune_vm::capabilities::IDelegate {
        AllInOneDelegate(const rune_vm::ILogger::CPtr& logger)
            : m_supportedCapabilities(g_supportedCapabilities.begin(), g_supportedCapabilities.end()) {}
        
        void setInput(const uint8_t* data, const uint32_t length) noexcept {
            m_input = rune_vm::DataView<const uint8_t>(data, length);
        }
        
    private:
        static constexpr auto g_supportedCapabilities = std::array{
            rune_vm::capabilities::Capability::Sound,
            rune_vm::capabilities::Capability::Accel,
            rune_vm::capabilities::Capability::Image,
            rune_vm::capabilities::Capability::Raw};
        
        // rune_vm::capabilities::IDelegate
        // return set of implemented capabilities to inform rune_vm runtime of what we are ready to work with
        [[nodiscard]] TCapabilitiesSet getSupportedCapabilities() const noexcept final {
            return m_supportedCapabilities;
        }
        
        // Requests specific capability from the user
        [[nodiscard]] bool requestCapability(
            const rune_vm::capabilities::Capability capability,
            const rune_vm::capabilities::TId newCapabilityId) noexcept final {
            // check if this delegates support request capability
            if(m_supportedCapabilities.count(capability) == 0)
                return false;

            // accept request for new capability allocation if everything is ok
            return true;
        }
        
        // Parametrizes capability id with some values. E.g. for image it might be its size
        [[nodiscard]] bool requestCapabilityParamChange(
            const rune_vm::capabilities::TId capabilityId,
            const rune_vm::capabilities::TKey& key,
            const rune_vm::capabilities::Parameter& parameter) noexcept final {
            // check the param applicability based on the capability id
            // use the param ...
            //
            // if everything is ok - accept param change request
            return true;
        }
        
        // This callback is called to request new input data for the Rune. Expect it to be invoked after you call IRune::call().
        [[nodiscard]] bool requestRuneInputFromCapability(
            const rune_vm::DataView<uint8_t> buffer,
            const rune_vm::capabilities::TId capabilityId) noexcept final {
            if(buffer.m_size != m_input->m_size) {
                // buffer size and your input size must match
                return false;
            }

            std::memcpy(buffer.m_data, m_input->m_data, buffer.m_size);
            m_input.reset();
            
            // we filled the buffer -> accept input request
            return true;
        }
        
        // data
        TCapabilitiesSet m_supportedCapabilities;
        std::optional<rune_vm::DataView<const uint8_t>> m_input;
    };
```

#### Create the context objects

First, you create the context - those objects are likely to be created only once per run.

```cpp
// create rune_vm context
// logger is kept alive as shared_ptr inside rune_vm objects
auto logger = std::make_shared<StdoutLogger>();
// engine, runtime and rune objects must be kept alive by the user, so don't release shared_ptrs
auto engine = rune_vm::createEngine(
    logger,
    rune_vm::WasmBackend::Wasm3,
    std::max<rune_vm::TThreadCount>(1, std::thread::hardware_concurrency() - 1));
auto runtime = engine->createRuntime();
```

Do not change the constructor arguments unless you know what you are doing.

#### Load the Rune(-s)

Then, load one or multiple runes. The context is shared between runes, but the delegates shouldn't be shared between them. Note that you may pass multiple delegates to the IRuntime::loadRune function. This is because you can have e.g. single delegate per implemented capability. It's up to you, just make sure delegates' supported capability don't overlap between each other.

```cpp
auto delegate = std::make_shared<AllInOneDelegate>(logger);
auto rune = runtime->loadRune({delegate}, pathToRuneFile);
```

#### Run the Rune(-s)

Now you have everything setup already. Now all you have to do is to update delegates' input and call IRune::call().

```cpp
while(true) {
    // update the input
    delegate->setInput(data, length);
    // run the Rune
    auto result = rune->call();
    auto json = result->asJson();
    // parse the result
    // ...
}
```

Rune returns IResult::Ptr. Its composite object which contains a variable-length array with any of the supported (see IResult::Type) variable types as elements. For some cases it might be easier to just convert it to json via IResult::asJson() and parse it via any generic json library.
