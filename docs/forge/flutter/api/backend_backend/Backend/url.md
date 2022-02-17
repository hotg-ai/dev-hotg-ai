


# url method




    *[<Null safety>](https://dart.dev/null-safety)*




[Uri](https://api.flutter.dev/flutter/dart-core/Uri-class.html) url
([String](https://api.flutter.dev/flutter/dart-core/String-class.html) endPoint)








## Implementation

```dart
Uri url(String endPoint) {
  return Uri.parse("$baseURL$endPoint".trim());
}
```







