# MobileBert

<img width="840" alt="Screenshot 2022-03-31 at 4 24 08 PM" src="https://user-images.githubusercontent.com/50593567/161039478-f1b85919-5615-4b50-8108-2f6ce13053fe.png">

The Bert Q&A model takes a passage, and a question as input then returns a segment of the passage that most likely answers the question.
Let’s look at the input/output of the model. Click on the node with the name _Mobile Bert_ to see the input/output of the model.
We can see the model-info:

```
Inputs:
        input_ids: Int32[1, 384]
        input_mask: Int32[1, 384]
        segment_ids: Int32[1, 384]
Outputs:
        end_logits: Float32[1, 384]
        start_logits: Float32[1, 384]
```

Looking at the input of the BERT QA model, it takes lists of integers as input, but earlier, we mentioned that model takes a paragraph of words and a question as input.

**How do we reconcile this?**

This is where the concept of pre-and post-processing of the data comes in. For our devices to understand a paragraph of text, we need to break that word down in a way that our machine can understand. That’s where the notion of **tokenization** comes in when dealing with NLP. The tokenizer will first split a given text into words (or parts of words, punctuation symbols, etc.), usually called tokens. The tokens are converted to numbers through a look-up table. We build a tensor out of them and feed them to the model.

Example: Original sentence: _“This is a nice sentence.”_

```
tokens: ['[CLS]', 'this', 'is', 'a', 'nice', 'sentence', '.', '[SEP]']
input_ids: [101, 2023, 2003, 1037, 3835, 6251, 1012, 102]
```

To make this all possible in the rune, we created three proc-blocks:

1. Tokenizers
2. Argmax
3. Text_extractor

The _Tokenizer_ proc-block takes a passage and a question as input and gives us _input_ids, input_masks, segment_ids_ as output which are then fed to the model. The model gives us _start_logits_ and _end_logits_ as output. The start and end logits contain values for all of the words in paragraph corresponding to how good they would be a start and endpoint of the answer for a given question; in other words, each of the words in the input receives a start and end index score/value representing whether they would be a good start word for the answer or a good end word for the answer. The answer would be from the start logit max value index to the end value logit max value index. The next step is to find out the max value index in the start and end logit. We will use our _Argmax_ proc-block, which will scan the whole array to provide us max value index. Finally, the _Text_extractor_ proc-block will convert the numbers back to the sentence. This output sentence will serve as the answer to the question.
