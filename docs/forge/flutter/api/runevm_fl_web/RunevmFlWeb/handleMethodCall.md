


# handleMethodCall method




    *[<Null safety>](https://dart.dev/null-safety)*




[Future](https://api.flutter.dev/flutter/dart-async/Future-class.html) handleMethodCall
([MethodCall](https://api.flutter.dev/flutter/services/MethodCall-class.html) dCall)








## Implementation

```dart
Future<dynamic> handleMethodCall(MethodCall dCall) async {
  await loadWebBindings();

  switch (dCall.method) {
    case 'load':
      manifest = await promiseToFuture(load(dCall.arguments));
      return true;
    case 'getManifest':
      return manifest;
    case 'runRune':
      print("dcall ${dCall.arguments["lengths"]}");
      return await promiseToFuture(
          call(dCall.arguments["bytes"], dCall.arguments["lengths"]));
    default:
      throw PlatformException(
        code: 'Unimplemented',
        details: 'runevm_fl for web doesn\'t implement \'${dCall.method}\'',
      );
  }
}
```







