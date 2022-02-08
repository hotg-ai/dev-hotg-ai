# Models

The central part of an ML pipeline is the model. The first step of creating a Rune is finding (or training) a Machine Learning model that matches your application. Right now, we support `TFlite` and `tfjs` models (_onnx support coming soon_). 

You have two options:
1. **Choose a pre-trained model**
Several pre-trained tflite/tfjs models are available for download from the [TF Hub](https://tfhub.dev/s?deployment-format=lite&module-type=image-classification&publisher=google). You can choose and start playing with the models from the TF Hub. 
2. **Custom Model**
You can go on training a model by yourself. After getting the desired accuracy, convert a TensorFlow model into the `tflite` with the TensorFlow Lite Converter.

There are various techniques using which one can optimize a model to reduce the memory footprint without losing accuracy. 
- Quantization
- Pruning
- Clustering
It will help deploy simple yet powerful models on extremely low-power, low-cost microcontrollers at the network edge.

You can find more details on converting a Tensorflow model to tflite [here](https://github.com/hotg-ai/tutorials/tree/main/lesson-7).

We have created a few Colab Notebooks to show how to train a model from scratch and converted them into tflite.
- [MicroSpeech](https://colab.research.google.com/drive/14lVizXG2Sprb5xFVHMifIZv0XBDiBzKV?usp=sharing): a Microspeech model for keyword spotting classification on the edge. 
- [Mask-Detection](https://colab.research.google.com/drive/1Gws788TZMO5LK5AR604EJarh0ow6R2Hu?usp=sharing): a model that detects whether a person is wearing a mask or not.
