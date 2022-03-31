# Person Detection

An image classification model takes a grayscale image as input and detects whether a person is present in the image.

<img width="811" alt="Screenshot 2022-03-31 at 4 29 00 PM" src="https://user-images.githubusercontent.com/50593567/161040283-527cbd9e-1b81-4944-b0c0-50a75976d013.png"/>

The first step of creating an ML pipeline is finding (or training) a Machine Learning Model that matches your application. Here, we have decided to choose the Person Detection model. We will start by knowing the model input/output information. So, click on the model node present inside the studio with the name of Person Detection. It will show the Input/Output information. This information will be used to build the ML Pipeline

<img width="279" alt="image8" src="https://user-images.githubusercontent.com/50593567/156827906-50ede245-eaa2-4418-a2dd-9011d15bd269.png"/>

Comparing input with the image format: `[batch_size, height, width, channels]`, we can see the model will take a `96 x 96` grayscale image (because the channel is 1). The input image type is `u8`, i.e., all the values will lie between `[0, 255]`. The output is an array of size `[1, 1, 1, 3]`. The model will return a list with scores for 3 labels. We will have to find the top score and its associated labels. Now, we have understood how the data will flow, let’s start with creating the ML pipeline.

1. Drag an Image from the Inputs:
   We will set the output type to `u8` and dimensions to `[1, 99, 99, 1]` because, as we saw above, this is the format needed by our model.
   The _IMAGE_ takes the following arguments:
   - width - the image's width in pixels
   - height - the image's height in pixels
   - pixel-format - the format used by the pixels. Possible values are:
     - @PixelFormat::Grayscale
     - @PixelFormat::RGB
2. Drag the Person Detection model from the left side panel.
3. We have got the output score for all three classes from our model. We want to find out which `1` classes with the highest score so that later we can print that class name as output. To get the index of class with the highest confidence value, we will use _most_confident_indices_ proc-block (a proc block which, when given a list of confidences, will return the indices of the top N most confident values). So, drag the _most_confident_indices_ proc-block from the left side pan.
   <img width="280" alt="image18" src="https://user-images.githubusercontent.com/50593567/156829594-0b6dbe24-2438-4d67-9f9e-54179b961cd5.png"/>

   Set input dimension same as output dimensions of the model `[1, 1, 1, 3]`. We want the three most confident values in the output, so set it to `1`. You will have to set the count the same as the output dimensions.

4. Till now, we have got an index of the most confident index. Next, we would like to assign a label to this index. We will follow the above approach and connect the output of the _most_confident_indices_ node to the input of our label node. Fill the Input values the same as the output dimension of _most_confident_indices_. We will get a string as output, so we will have to set the output type to `utf8` and dimensions to `1`. In Properties, we will upload the labels of our model. You can find the label file [here](https://drive.google.com/file/d/1srrXUYVG1-LoRYC75iyDVY6iz2t_oStb/view?usp=sharing)  
   <img width="269" alt="image6" src="https://user-images.githubusercontent.com/50593567/156829790-2ab4ba3e-63a1-48e6-b3b7-3eeef35707ae.png"/>

5. Finally, connect the output of the label proc-block node to the input of the `Output` node.
