


# runRune method




    *[<Null safety>](https://dart.dev/null-safety)*




[Future](https://api.flutter.dev/flutter/dart-async/Future-class.html) runRune
([Uint8List](https://api.flutter.dev/flutter/dart-typed_data/Uint8List-class.html) input, [[List](https://api.flutter.dev/flutter/dart-core/List-class.html)&lt;[int](https://api.flutter.dev/flutter/dart-core/int-class.html)> lengths = const []])








## Implementation

```dart
static Future<dynamic> runRune(Uint8List input,
    [List<int> lengths = const []]) async {
  if (lengths.length == 0) {
    lengths = [input.length];
  }
  final dynamic result = await _channel
      .invokeMethod('runRune', {"bytes": input, "lengths": lengths});
  return result;
}
```







