


# forge method




    *[<Null safety>](https://dart.dev/null-safety)*




[Future](https://api.flutter.dev/flutter/dart-async/Future-class.html) forge
([Map](https://api.flutter.dev/flutter/dart-core/Map-class.html)&lt;[String](https://api.flutter.dev/flutter/dart-core/String-class.html), dynamic> parameters)








## Implementation

```dart
static Future<dynamic> forge(Map<String, dynamic> parameters) async {
  print("Loading forge $parameters");
  if (parameters.containsKey("deploymentId")) {
    deploymentId = int.tryParse(parameters["deploymentId"]);
  } else {
    throw Exception('[ForgeSDK] No deploymentId found in JSON');
  }
  if (parameters.containsKey("apiKey")) {
    apiKey = parameters["apiKey"];
  } else {
    throw Exception('[ForgeSDK] No apiKey found in JSON');
  }
  if (parameters.containsKey("baseURL")) {
    baseURL = parameters["baseURL"];
  } else {
    throw Exception('[ForgeSDK] No baseURL found in JSON');
  }
  if (parameters.containsKey("telemetry")) {
    if (parameters["telemetry"].containsKey("baseURL")) {
      telemetryURL = parameters["telemetry"]["baseURL"];
    } else {
      throw Exception('[ForgeSDK] No telemetryURL found in JSON');
    }
  }
  Backend backend = new Backend(apiKey!, baseURL!);
  print("downloading");
  Uint8List runeBytes = await backend.downloadRune(deploymentId!);
  await RunevmFl.load(runeBytes);
  manifest = await RunevmFl.manifest;
  loaded = true;
  return manifest;
}
```







