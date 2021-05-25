---
title: Runefile YAML Format
sidebar_label: Runefile YAML Format
---

The primary way to create a Rune is by using a text file in the YAML format,
referred to as a Runefile, to declare how a machine learning pipeline is
configured.

<details>
<summary>A typical Runefile.</summary>

```yaml
image: runicos/base

pipeline:
  rand:
    capability: RAND
    outputs:
      - type: F32
        dimensions: [1]

  mod360:
    proc-block: "hotg-ai/rune#proc_blocks/modulo"
    inputs:
      - rand
    outputs:
      - type: F32
        dimensions: [1]
    args:
      modulus: 360.0

  sine:
    model: "./sinemodel.tflite"
    inputs:
      - mod360
    outputs:
      - type: F32
        dimensions: [1]

  serial:
    out: serial
    inputs:
      - rand

  identity:
    proc-block: "./identity"
    inputs:
      - mod360
      - sine
    outputs:
      - type: F32
        dimensions: [1]
      - type: F32
        dimensions: [1]

  debug_output:
    out: serial
    inputs:
      - rand
      - identity.0 # mod360
      - identity.1 # The sine output
```

</details>

The sections on this reference page are organized to reflect the structure of
the Runefile itself.

## Image

The first item in a Runefile is the `image`. This specifies the functionality
that will be provided to the Rune by the runtime.

The only image supported at the moment is `runicos/base`.

```yaml
image: runicos/base
```

## Pipeline

The main concept in a Runefile is that of the "pipeline". This is a directed
acyclic graph specifying how data is transformed as it passes through the Rune.

The `pipeline` is a dictionary of key-value pairs where the key attaches a name
to a particular stage.

### Common Properties

There are several types of stages, but most will share some common properties.

#### Arguments

A stage may specify `args` that can be used to modify how data is generated or
transformed. This is a free-form dictionary of key-value pairs where the value
can be a primitive type (e.g. numbers and strings) or a list of primitive types.

Examples of this may be providing the sample rate to an audio capability or
the list of labels to use when classifying.

```yaml
pipeline:
  audio:
    capability: SOUND
    args:
      hz: 16000

  label:
    proc-block: "hotg-ai/rune#proc_blocks/label"
    args:
      labels:
        - silence
        - unknown
        - up
        - down
        - left
        - right
```

#### Inputs

The `inputs` property contains a list of strings specifying which stages a
particular stage may receive input from. This is typically just the stage's
name, but in cases when a stage may have multiple outputs the desired output
may be specified using dot syntax.

Here is an example where the `debug` stage accepts data from `rand` and the
outputs 0 and 1 from the `identity` stage:

```yaml
pipeline:
  debug:
    out: serial
    inputs:
      - rand
      - identity.0
      - identity.1
```

#### Outputs

Each stage which outputs data must specify the type of that data using the
`outputs` property. This specifies the data type and shape of a tensor.

A stage may have multiple outputs. For example, if using a proc block to
classify the two most confident inputs and return both the labels and confidence
values.

```yaml
pipeline:
  label:
    proc-block: "hotg-ai/rune#proc_blocks/label"
    outputs:
      - type: F32
        dimensions: [2]
      - type: UTF8
        dimensions: [2]
```

Supported types are:

| Name   | Kind    | Description                         |
| ------ | ------- | ----------------------------------- |
| `u8`   | Integer | An 8-bit unsigned integer           |
| `i8`   | Integer | An 8-bit signed integer             |
| `u16`  | Integer | A 16-bit unsigned integer           |
| `i16`  | Integer | A 16-bit signed integer             |
| `u32`  | Integer | A 32-bit unsigned integer           |
| `i32`  | Integer | A 32-bit signed integer             |
| `u64`  | Integer | A 64-bit unsigned integer           |
| `i64`  | Integer | A 64-bit signed integer             |
| `f32`  | Float   | A 32-bit floating point number      |
| `f64`  | Float   | A 64-bit floating point number      |
| `utf8` | String  | An arbitrary-length string constant |

The `dimensions` property specifies the shape of a tensor (multi-dimensional
array) in [row-major order][row-major].

### Capabilities

A capability stage is how information from the outside world enters the Rune.
This may take the form of an image from the device's camera or samples from an
audio file.

```yaml
pipeline:
  rand:
    capability: RAND
    outputs:
      - type: F32
        dimensions: [1]
```

Capabilities have the following properties:

- [`args`](#args)
- [`outputs`](#outputs)

Capabilities are specified using a `capability` key which dictates what type
of capability it is.

Supported capability types are:

| Name  | Description                                                      | Supported Arguments                                                                                                                                                                                                                                                                |
| ----- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAND  | random data generated from the runtime's random number generator |                                                                                                                                                                                                                                                                                    |
| RAW   | raw data from a user-specified source                            |                                                                                                                                                                                                                                                                                    |
| SOUND | 16-bit Pulse Code Modulated audio samples                        | <ul><li>`hz` - the sample rate in Hertz</li></ul>                                                                                                                                                                                                                                  |
| IMAGE | An image                                                         | <ul><li>`width` - the image's width in pixels</li><li>`height` - the image's height in pixels</li><li>`pixel-format` - the format used by the pixels. For convenience the constants `@PixelFormat::Grayscale`, `@PixelFormat::RGB`, and `@PixelFormat::BGR` may be used.</li></ul> |


[row-major]: https://en.wikipedia.org/wiki/Row-_and_column-major_order
