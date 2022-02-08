# Capabilities

A capability node is how information from the outside world enters the Rune. This may take the form of an image from the device's camera or samples from an audio file. Capabilities are specified using a capability key which dictates what type of capability it is.

Capabilities have the following properties:

- outputs
- args

We support five capabilities:

1.  **Accelerometer**  
    It lets you read samples from your device in a tuple of 3 `f32`s, X, Y, and Z. It could be helpful in reading gesture detection.

    - outputs - You will have to choose _Element Types_ and _Dimensions_ of you data. It supports `f32` as only Element Type.
    - args
      - N - number of samples in the data.

2.  **Image**  
    This capability will let you import video and image streams to your edge device. This is a great computer vision application!

    - outputs

      - Elements Type - add your input data type
      - Dimensions - set the dimension in this format `[batch_size, height, width, channels]`, where channels is `1` for _GrayaScale_ image while `3` for an _RGB_ image

    - args
      - width - the image's width in pixels
      - height - the image's height in pixels
      - pixel-format - the format used by the pixels. Possible values are:
        - @PixelFormat::Grayscale
        - @PixelFormat::RGB

3.  **Sound**  
    It let's you read 16-bit Pulse Code Modulated audio samples. It has applications in audio domain.

    - outputs

      - Elements Type - support i16 as audio samples
      - Dimensions - length of sample (sampling rate \* audio length in `ms`)

    - args

      - Hz - sampling rate
      - Sample Duration Ms - audio length in `ms`

4.  **Random**  
    A simple capability to generate random numbers in any format/data -type you want.

    - outputs
      - Elements Type - choose any element type
      - Dimensions - shape of output data you want

5.  **Binary**  
    A capability that helps you embed any applications such as text and more. It sends out your input data in the `ASCII coding`.

    - outputs
      - Elements Type - set the type to `u8`
      - Dimensions - set the length of your input text (keep it much bigger than your input data size because the u8 conversion would be bigger)
