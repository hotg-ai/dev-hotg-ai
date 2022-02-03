# Processing Blocks

### 1. argmax

This proc-block returns indices of the max element of the array.

  - Types
      - Supported input types - `f32`
      - Supported output types - `u32`

### 2. audio_float_conversion

Many audio models take in an input of `f32`. This proc-block convert our input
from an `i16` data type to a floating-point value.

  - Types
      - Supported input types - `i16`
      - Supported output types - `f32`

### 3. binary_classification

A proc-block takes a probability (0.0 to 1.0) score as input and divides the output into two classes ( 0 or 1) based on a threshold. It returns 1 if the probability value is greater than the threshold otherwise, 0. This is useful in binary classification problems.

  - Types
      - Supported input types - `f32`
      - Supported output types - `u32`
  - args
      - threshold - criteria to divide output into classes

### 4. fft

This proc-block converts a signal from its original domain (often time or space)
to a representation in the frequency domain.

  - Types
      - Supported input types - `i16`
      - Supported output types - `u32`
  - args
      - Sample Rate - Sampling rate
      - Bins - intervals between samples in frequency domain
      - Window Overlap - Ratio of overlapped intervals.

### 5. image-normalization

A normalization routine takes the image matrix as input and fits their values to the range `[0, 1]` as `f32`'s.

  - Types
      - Supported input types - `u8, u16, u32, i8, i16, i32` 
      - Supported output types - `f32`

### 6. label

A proc block, when given a set of indices, will return their associated labels.

  - Types
      - Supported input types - `u8, u16, u32, u64, i8, i16, i32, i64, f32, f64` 
      - Supported output types - `utf8`
  - args
      - wordlist - Upload the wordlist in the `.txt` format with every label in different line.

### 7. modulo

As the same suggests, it returns the remainder of a division after one number is
divided by another.

  - Types
      - Supported input types - `u8, u16, u32, u64, i8, i16, i32, i64, f32, f64` 
      - Supported output types - `utf8`

### 8. most_confident_indices.

A proc block which, when given a list of confidences, will return the indices of the top N most confident values.

  - Types
      - Supported input types - `u8, u16, u32, u64, i8, i16, i32, i64, f32, f64` 
      - Supported output types - `u32`
  - args
      - Count - number of classes with highest confidence you want as output


### 9. noise-filtering

This proc-block perform a couple of functions:

- Reduces noise within each frequency bin (channel)
- Applies a gain control algorithm to each frequency bin (channel)
- Applies log2 function and scales the output.

It reduces noise and applies a gain control algorithm within each frequency bin.

  - Types
      - Supported input types - `u32` 
      - Supported output types - `i16`

### 10. normalize

This proc-block normalizes the input to the range `[0, 1]`.

  - Types
          - Supported input types - `u8, u16, u32, u64, i8, i16, i32, i64, f32, f64` 
          - Supported output types - `f32`
  - args
      - Count - number of classes with highest confidence you want as output

### 11. object_filter

A proc-block which takes 3-d tensor `[1, num_detection, detection_box(x, y, w, h) + confidence_scores + total_detection_classes]` and filter the detected objects to:
- remove duplicate detection for a single object
- remove the objects with low confidence based on a threshold

giving a 2-d tensor with dimension `[*, 6]` (where * is the total number of detected objects and 6 -> `[ x-coordinate, y-coordinate, h, w, confidence_value, label_index]`) as output. It is used in object detection models.

  - Types
        - Supported input types - `f32` 
        - Supported output types - `f32`
  - args
      - Threshold - remove the objects with confidence value below this threshold

### 12. parse

 A proc block that can parse a string to numbers. This proc-block could be
 helpful in doing non-ML tasks.
 
   - Types
          - Supported input types - `utf8`
          - Supported output types - `u8, u16, u32, u64, i8, i16, i32, i64, f32, f64` 
      
### 13. segment_output

A proc-block which takes a rank 4 `tensor` as input, whose dimension is of this form `[1, x, y, z]`. It will return:
- a 2-d `tensor` after performing argmax along the axis-3 of the tensor
- a 1-d `tensor` which a `set` of all the numbers present in the above 2-d `tensor`
 
   - Types
        - Supported input types - `f32`
        - Supported output types - `u32` 
         
### 14. softmax

This proc-block returns tensor after applying the softmax function over the array.

  - Types
      - Supported input types - `f32`
      - Supported output types - `f32`
        
### 15. tokenizer

A proc-block takes a passage and a question as input and gives us input_ids, input_masks, segment_ids as output which are then fed to the model. This is helpful in NLP models.

  - Types
      - Supported input types 
          - input-1 types - `u8`
          - input-2 types - `u8`
      - Supported output types
          - output-1 types - `i32`
          -  output-2 types - `i32`
          -  output-3 types - `i32`
          - output-3 types - `u8`
            
### 16. text_extractor

A proc-block takes start logits, end logits, and ASCII coded text and returns an output sentence (utf8 encoded) from start logit to ends logit.

  - Types
      - Supported input types 
          - input-1 types - `u8`
          - input-2 types - `u32`
          - input-3 types - `u32`
      - Supported output types
          - output-1 types - `utf8`