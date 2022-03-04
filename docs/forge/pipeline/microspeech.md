# Microspeech

This example shows how to train a 27 KB model that can recognize 6 keywords, `“silence”, “unknown”, “up”, “down”, “left”, “right”` from speech data. The CNN takes as input the `int8` output of the spectrogram and gives a 4-element vector showing the probability predicted by the model for each of the outcomes.

![image19](https://user-images.githubusercontent.com/50593567/156812666-5937d6d7-a981-4d35-a9f9-7e0babdf60cb.png)

It’s a simple CNN model with one convolution and one fully connected layer, implemented as a `TFLite` model with `8-bit` quantized weights.

The model doesn't take in raw audio sample data. We need to implement the processing operations. Rather than passing in the time series data directly into the model, we will transform the audio data into an audio spectrogram representation. This will create a `2D` representation of the audio signal’s frequency content over time. The input audio signal we will use will have a sampling rate of `16kHz`, this means one second of audio will contain `16,000` samples. We will use the _Short-time Fourier Transform_ proc-block to perform this step. Next, we need to reduce noise and apply a gain control algorithm within each frequency bin. So, we will use a _Noise Filtering_ proc-block.
The processed data is passed to the model and it will return a list of confidence values for each label. We will select the one with the highest confidence value. To do this, we will use _Most Confident Indices_. It will return the indices of the top N most confident values. We will find labels associated with this using the Label proc-block. So, we have `6` labels:

1. silence
2. unknown
3. up
4. down
5. left
6. right

You can also train the model by yourself on some different keywords. Here is the link to [Colab notebook](https://colab.research.google.com/drive/14lVizXG2Sprb5xFVHMifIZv0XBDiBzKV?usp=sharing)

Now we have gotten an overview of the ML pipeline. Let’s start building it:

1. Drag the _Sound Input_ and click on it to fill the arguments. First, fill the outputs Element Types to `i16` and Dimensions to `16000`. In the Properties, as discussed earlier we will take input audio at a sampling rate of `16kHz`. The model takes `1-sec` audio so set Sample Duration `Ms` to `1000` milliseconds.
2. Drag _Short-time Fourier Transform_ proc-block. Fill the Inputs the same as _Sound_ Outputs. Scale the output to `[0, 2^32]` range (full range of the `u32` type). The output will be a vector of `1960 u32` elements. Fill the properties accordingly.
3. Drag _Noise Filtering_ proc-block. It takes as input a `1960-element` `u32` slice and gives as output a `1960-element` `i8` slice.
4. Next, we have the model in our pipeline. Connect _Noise Filtering_ proc-block to model.
5. We have got the output score for all six classes from our model. We want to find out which class has the highest score so that later we can print that class name as output. To get the index of class with the highest confidence value, we will use _most_confident_indices_ proc-block.
6. Till now, we have got an index of the most confident index. Next, we would like to assign a label to this index. For this, we will use the _label_ proc-block. On the right-side panel, You can see the _Upload button_ under the Properties section. You will have to upload a .txt file that contains labels for the model in the correct order. You can find the label file for this model here. Download this label file and upload it in the _label_ proc-block.
7. Connect the label proc-block node to the _Output_ node.

**Testing**

Click on the _Test Button_ and scan the _QR code_ using the Runic Mobile app.
