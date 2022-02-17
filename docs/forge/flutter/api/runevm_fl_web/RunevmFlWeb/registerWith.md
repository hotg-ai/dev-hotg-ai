


# registerWith method




    *[<Null safety>](https://dart.dev/null-safety)*




void registerWith
([Registrar](https://api.flutter.dev/flutter/flutter_web_plugins/Registrar-class.html) registrar)








## Implementation

```dart
static void registerWith(Registrar registrar) {
  final MethodChannel channel = MethodChannel(
    'runevm_fl',
    const StandardMethodCodec(),
    registrar,
  );

  final pluginInstance = RunevmFlWeb();
  channel.setMethodCallHandler(pluginInstance.handleMethodCall);
}
```







