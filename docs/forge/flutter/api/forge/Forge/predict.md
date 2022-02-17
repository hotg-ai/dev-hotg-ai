


# predict method




    *[<Null safety>](https://dart.dev/null-safety)*




[Future](https://api.flutter.dev/flutter/dart-async/Future-class.html)? predict
([List](https://api.flutter.dev/flutter/dart-core/List-class.html)&lt;[Uint8List](https://api.flutter.dev/flutter/dart-typed_data/Uint8List-class.html)> inputData)








## Implementation

```dart
static Future<dynamic>? predict(List<Uint8List> inputData) {
  if (inputData.length == 1) {
    return RunevmFl.runRune(inputData[0]);
  } else {
    List<int> inputs = [];
    List<int> lengths = [];
    for (Uint8List input in inputData) {
      inputs.addAll(input);
      lengths.add(input.length);
      return RunevmFl.runRune(new Uint8List.fromList(inputs), lengths);
    }
  }
  return null;
}
```







