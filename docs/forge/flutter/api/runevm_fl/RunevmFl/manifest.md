


# manifest property




    *[<Null safety>](https://dart.dev/null-safety)*




[Future](https://api.flutter.dev/flutter/dart-async/Future-class.html) manifest
  







## Implementation

```dart
static Future<dynamic> get manifest async {
  dynamic reply = await _channel.invokeMethod('getManifest');
  if (!kIsWeb) {
    if (Platform.isIOS) {
      reply = utf8.decode(List<int>.from(reply));
    }
    List<dynamic> capabilities = jsonDecode(reply);
    //[{"capability":4,"parameters":[{"key":"pixel_format","value":"0"},{"key":"width","value":"384"},{"key":"height","value":"384"}]},{"capability":4,"parameters":[{"key":"pixel_format","value":"0"},{"key":"width","value":"256"},{"key":"height","value":"256"}]}]
    // to
    // [{"type":"ImageCapability","width":96,"pixel_format":2,"height":96}]

    List manifest = [];
    for (dynamic element in capabilities) {
      Map<String, dynamic> cap = {
        "type": capabilitiesDefinition[element["capability"]]
      };
      for (dynamic param in element["parameters"]) {
        cap[param["key"]] = int.tryParse("${param["value"]}");
      }
      manifest.add(cap);
    }
    return manifest;
  }
  return jsonDecode(reply);
}
```








