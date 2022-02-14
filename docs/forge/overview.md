# Overview

Forge is a simplified GUI for generating Runefiles. One can quickly build, test, and deploy their edgeML applications. The main concept is to make a "pipeline". An ML pipeline will take inputs from the outside world, performs some processing/operation, and send the output back to the outside world. One can create an ML pipeline by dragging and dropping nodes from the left-side panel.

## Nodes

Nodes can be broken down into four types described below:

1.  **Capability**
    A capability node is how information from the outside world enters the pipeline. Capability is simplified interfaces to your device that help you get data from sensors into your edgeML pipeline. Go ahead and filter the left side list using the search bar to see the ones we have!

<img width="347" alt="image2" src="https://user-images.githubusercontent.com/50593567/152220774-a7fe171f-0aae-4af5-83e9-6f8a88d16cb8.png" />

Currently, we support five types of capabilities:

- Accelerometer
  A capability that will let you collect accelerometer data in a tuple of 3 from your device. This is valuable for gesture detection.
- Image
  This capability will let you import video and image streams to your edge container. This is a great computer vision application!
- Sound
  Collect sound signals. It will let you build wake work EdgeML Applications.
- Random
  A simple capability to gather random numbers in any format you want.
- Binary
  This capability can help you embed any applications such as text and more.

2. **Processing Blocks**
   A small edge-optimized package exposes functionality for transforming data from one form to another. We have created a list of proc-block for you. You can find it [here](https://github.com/hotg-ai/proc-blocks).

3. **Models**
   You can drag simple off the shelf models that can be used to build any sort of ML pipeline :)

4. **Output**
   It is the mechanism to pass information processed by the ML pipeline to the outside world (e.g., the host application).

## ML Flow

The idea is to **train, build, test, and deploy**!

**Train**
You can start with choosing an ML model from the left side panel or could train one for yourself. If you have trained your model yourself, you can upload it into the studio through the _Upload Models Button_ (top right corner). You can see your model in the _My Nodes_ section. Drag and drop the model into the _canvas_.

**Build**
Work with your imagination and start building cool ML pipelines. The pipeline will guide the flow of data. Once you are done with the pipeline, hit the `Build Button`. It will create the _Rune_ for you.

**Test**
Once the build is complete, you can access the _Test Button_. Click on the Test Button and scan the QR code using the Runic Mobile app. If you are not satisfied with testing, you can tweak the model's training parameters. Re-train it to get a model with higher accuracy. Train, Test, Repeat!

**Deploy**
After being satisfied with the testing, you are ready to deploy your rune. When you click on the Deploy Button, you can see we provide two SDKs (_more are coming_) for interacting with Forge.

- **@hotg-ai/forge** - for use in a ReactJS application (either browser or React Native)
- **runevm_fl** - a Flutter plugin for use in Mobile applications and PWAs

We have created some [getting started tutorials](https://github.com/hotg-ai/forge-runtime-examples) that can help you quickly deploy your rune.

## Templates

We have created a few templates of (CV, Audio, NLP). You can use them to learn how to create an ML pipeline.