


# load method




    *[<Null safety>](https://dart.dev/null-safety)*




[Future](https://api.flutter.dev/flutter/dart-async/Future-class.html)&lt;[bool](https://api.flutter.dev/flutter/dart-core/bool-class.html)?> load
([Uint8List](https://api.flutter.dev/flutter/dart-typed_data/Uint8List-class.html) bytes)








## Implementation

```dart
static Future<bool?> load(Uint8List bytes) async {
  await _channel.invokeMethod('load', bytes);

  return true;
}
```







