


# downloadRune method




    *[<Null safety>](https://dart.dev/null-safety)*




[Future](https://api.flutter.dev/flutter/dart-async/Future-class.html)&lt;[Uint8List](https://api.flutter.dev/flutter/dart-typed_data/Uint8List-class.html)> downloadRune
([int](https://api.flutter.dev/flutter/dart-core/int-class.html) deploymentId)








## Implementation

```dart
Future<Uint8List> downloadRune(int deploymentId) async {
  print("downloadRune");
  final client = http.Client();
  final response = await client.get(url("/forge/deployment"),
      headers: {"x-api-key": "$apiKey", "deploymentId": "$deploymentId"});
  client.close();
  return response.bodyBytes;
}
```







