---
title: Setup and Installation
sidebar_label: Setup and Installation
---

If you just want to try out Rune without installing anything, head over to
[the tutorial](./tutorials/lesson-1/README) for links to our online
playground.

To use Rune, you will need the following:

- the `rune` CLI tool - for building and running Runes from the command-line
- [the Rust toolchain][rustup] - for doing the actual compiling to WebAssembly
- The `tinyverseml/rune-serve` Docker image - lets you use your Rune from the
  Runic Mobile app without needing to upload to a registry

Rune tools work with the following systems:

- Linux
- MacOS
    - Note: **it is not advised to use Rune on M1 devices**. We have received
      several reports of M1 bugs in Docker and TensorFlow.
- Windows (using WSL or the Docker images)

## GitHub Releases

Pre-compiled bundles containing the `rune` CLI tool and examples are available
on [our GitHub Releases page][latest-release] as the `rune.$target.zip` asset,
where `$target` is the [target triple][target-triple] corresponding to your OS
(e.g.  `x86_64-apple-darwin` for x86 MacOS).

For those who like to live on the bleeding edge, [our nightly release][nightly]
contains the same assets but automatically generated from `master` every 24
hours.

Once you have downloaded the pre-compiled bundles you will need to put the
`rune` executable somewhere on [your `$PATH`][path]. Typically, [this will be `~/bin`
or `~/.local/bin`][executable-dir].

```console
$ curl -L -O https://github.com/hotg-ai/rune/releases/latest/download/rune.x86_64-unknown-linux-gnu.zip
$ unzip rune.x86_64-unknown-linux-gnu.zip
$ mkdir -p ~/.local/bin
$ cp rune ~/.local/bin/rune
```

As a security measure, when you download a program from the internet some
operating systems will remove their executable flag. You may need to `chmod` the
`rune` binary to make it executable.

```console
$ chmod +x ~/.local/bin/rune
$ rune --version
rune 0.10.0
```

## Docker

We have a docker image that comes with the `rune` CLI and Rust toolchain
already installed.

```console
$ docker pull tinyverseml/rune-cli
$ docker pull tinyverseml/rune-serve
```

## Compile From Source

The `rune` CLI tool can be installed using `cargo install` just like a normal
Rust tool.

As well as requiring [the Rust toolchain](https://rustup.rs/), the Rune project
uses several native libraries so you will need to install the following
build dependencies:

- [`bindgen`](https://github.com/rust-lang/rust-bindgen) (`cargo install bindgen`)
- [Clang and LLVM](https://releases.llvm.org/download.html)
- [CMake](https://cmake.org/download/)
- [Docker](https://docs.docker.com/get-docker/) *(Linux only)*
- [Bazel](https://docs.bazel.build/versions/main/install.html) *(Windows and MacOS)*

You can then install the Rune CLI from crates.io:

```shell
$ cargo install hotg-rune-cli
```

Alternatively, if you want to live on the bleeding edge you can install it
directly from [the GitHub repository][rune-repo] (either `master` or a tagged
version):

```shell
$ cargo install --git https://github.com/hotg-ai/rune hotg-rune-cli

$ cargo install --git https://github.com/hotg-ai/rune hotg-rune-cli --rev v0.4.0
```

Compiling TensorFlow Lite from source can take quite a while, especially on less
powerful machines, so do not panic if the build seems "stuck" at this stage:

```
building [=======================> ] 400/406: hotg-runecoral(build)
```

[latest-release]: https://github.com/hotg-ai/rune/releases/latest
[target-triple]: https://doc.rust-lang.org/nightly/rustc/platform-support.html
[nightly]: https://github.com/hotg-ai/rune/releases/tag/nightly
[executable-dir]: https://unix.stackexchange.com/questions/36871/where-should-a-local-executable-be-placed
[path]: https://en.wikipedia.org/wiki/PATH_(variable)#Unix_and_Unix-like
[rustup]: https://rustup.rs/
