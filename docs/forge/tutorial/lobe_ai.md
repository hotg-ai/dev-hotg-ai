---
title: Using Lobe.ai with Forge
sidebar_label: Custom CV models using Lobe.ai
---

# Using Lobe.ai with Forge

In this tutorial you will learn how to make a custom model using Lobe.ai and test it using forge!

## Setup

Get [Lobe.ai](https://www.lobe.ai/)! Lobe.ai is a rapid training tool for machine learning models. Currently, it supports computer vision models but they have more model types coming soon.

<iframe width={560} height={315} src="https://www.youtube.com/embed/Mdcw3Sb98DA" title="YouTube video player" frameBorder={0} allowFullScreen ></iframe>

Get an account a free [Studio](https://studio.hotg.ai/) account. Using studio you will be able to build
the ML pipeline around your ML Pipeline. 

Also get the Runic Mobile app that you will use to test your EdgeML pipeline. The runic mobile app is available on [iOS](https://apps.apple.com/us/app/runic-by-hotg-ai/id1550831458) and [Android](https://play.google.com/store/apps/details?id=ai.hotg.runicapp&hl=en_US&gl=US).

## Step 1: Collect Some Data!

I will be making a simple coffee or not coffee CV detection model. To do that I need to collect some images :) The video below shows how you can do this using the lobe.ai app.

<iframe width={640} height={400} src="https://www.loom.com/embed/3dedbd7fe3cf45cc9a7701ac457423db" frameBorder={0} allowFullScreen></iframe>

## Step 2: Train your model!

Lobe will train a model on your data seemlessly! You can see this on the train sidebar link. 

## Step 3: Export a TFLite optimized model!

Go to the `use` tab and click the `export` button. Select TFlite as your output, this will take a bit of time.

<img src="/img/tutorials/lobe/export.png" />

Once it is done exporting it will create a folder which will have two files we need. One is the `saved_model.tflite` and the other is `labels.txt`. 

## Step 4: Start a Computer Vision project on Studio :)

Head over to the [Studio](https://studio.hotg.ai/) and create a new project with the inception template. 

<img src="/img/tutorials/lobe/create-a-project.png" />

Now with a few simple steps you can drag and drop your model into the project. I walk through the steps in the video below.

## Step 5: Build your ML Pipeline!

<iframe width={640} height={400} src="https://www.loom.com/embed/fb6b8fa47d724b62ac756d835007650e" frameBorder={0} webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>

Steps: 
1. Upload your tflite model from step 3 into the project by dragging and dropping on the top left corner of the canvas.
2. Lobe.ai models expect an input of f32 normalized images. So we need to add a preprocessing step to normalize the images. Drage the image normalization processing block on to the canvas.
3. Modify the image input node and image normalization processing block to match your model input shape of 224,224,3.
4. Next connect the nodes from Image, Image Normalization, and the model input port. 
5. Make sure to update the `Most Confidence Indices` to the `1,1` tensor shape so you get the top result. 
6. Update the label processing block by uploading the `labels.txt` provided by Lobe.ai in step 3, and the tensor shape to 1.
7. Hit build! If you are successful you will see the Build logs show a success message and the test option will be available. 


Step 6; Test your model on the Runic mobile app!


<iframe width={640} height={400} src="https://www.loom.com/embed/8ee85c60000b4860bba8ceb7e3da54f1" frameBorder={0}></iframe>

Make sure you have the runic mobile app which is available on [iOS](https://apps.apple.com/us/app/runic-by-hotg-ai/id1550831458) and [Android](https://play.google.com/store/apps/details?id=ai.hotg.runicapp&hl=en_US&gl=US).

You can then scan using the runic mobile app :) 

<iframe width={640} height={1384} src="https://www.loom.com/embed/d288e08ab146419499bb6736c134f8a6" frameBorder={0} allowFullScreen></iframe>

During testing you will see your device logs on the bottom test logs panel. 

<img src="/img/tutorials/lobe/test_logs.png" />

# Final Notes

Remember the more variation of images you take the better your model will be :)




