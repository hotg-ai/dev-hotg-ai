


# loadWebBindings method




    *[<Null safety>](https://dart.dev/null-safety)*




dynamic loadWebBindings
()








## Implementation

```dart
static loadWebBindings() async {
  if (bridgeLoaded == false) {
    try {
      String script =
          await rootBundle.loadString('packages/runevm_fl/assets/bridge.js');
      JS.injectScript(script);
      bridgeLoaded = true;
    } catch (e) {
      print("Exception $e while loading bridge");
      bridgeLoaded = false;
    }
  }
}
```







