


# runevm_fl - Dart API docs


<h1 id="forgesdk">ForgeSDK</h1>
<h2 id="getting-started">Getting Started</h2>
<h3 id="add-the-runevm-plugin-to-your-pubspecyaml-file">Add the RuneVM plugin to your pubspec.yaml file</h3>
<pre class="language-dart"><code>dependencies:
  flutter:
    sdk: flutter
  runevm_fl: ^0.1.2

</code></pre>
<h3 id="load-and-run-your-rune-file">Load and run your rune file</h3>
<p>Load and run your rune file in three steps:</p>
<h4 id="deploy">Deploy</h4>
<pre class="language-dart"><code class="language-dart">Future&lt;bool&gt; RunevmFl.load(Uint8List runeBytes)
</code></pre>
<h4 id="read-manifest">Read manifest</h4>
<pre class="language-dart"><code class="language-dart">Future&lt;dynamic&gt; RunevmFl.manifest
</code></pre>
<h4 id="run-rune-with-input-bytes">Run rune with input bytes</h4>
<pre class="language-dart"><code class="language-dart">Future&lt;String&gt; RunevmFl.runRune(Uint8List input)
</code></pre>
<h4 id="implementation">Implementation</h4>
<p>Full implementation in <a href="example/lib/main.dart">main.dart</a></p>
<pre class="language-dart"><code class="language-dart">
import 'package:runevm_fl/runevm_fl.dart';

class RunMyRune {

  double _input = 0;
  String? _output;

  Future&lt;void&gt; _loadRune() async {
    try {
      //Load Rune from assets into memory;
      ByteData bytes = await rootBundle.load('assets/sine.rune');
      bool loaded =
          await RunevmFl.load(bytes.buffer.asUint8List()) ?? false;
      print("Rune deployed:");
      if (loaded) {
        //Read Manifest with capabilities
        String manifest = (await RunevmFl.manifest).toString();
        print("Manifest loaded: $manifest");
      }
    } on Exception {
      print('Failed to init rune');
    }
    setState(() {
      _loaded = true;
    });
  }

  void _runRune() async {
    try {
      Random rand = Random();
      _input = rand.nextDouble() * 2 * pi;
      //convert input to 4 bytes representing a Float32 (See assets/Runefile)
      Uint8List inputBytes = Uint8List(4)
        ..buffer.asByteData().setFloat32(0, _input, Endian.little);
      //Run rune with the inputBytes
      _output = await RunevmFl.runRune(inputBytes);
      setState(() {});
    } on Exception {
      print('Failed to run rune');
    }
  }

}

</code></pre>
<h3 id="android">Android</h3>
<p>No extra config needed</p>
<h3 id="ios">iOS</h3>
<p>If you are creating a new app, first run :</p>
<pre class="language-console"><code class="language-console">foo@bar:~$ flutter run
</code></pre>
<p>to generate the podfile.</p>
<p>Minimum iOS version should be at least 12.1 to be compatible with the plugin:</p>
<p>Set this in XCode &gt; Runner &gt; General &gt; Deployment info</p>
<p>Bitcode needs to be disabled either for the runevm_fl target:</p>
<p>XCode &gt; Pods &gt; Targets &gt; runevm_fl &gt; Build Settings &gt; Enable Bitcode &gt; Set to 'No'</p>
<p>or directly in the Podfile:</p>
<pre class="language-dart"><code>post_install do |installer|
  installer.pods_project.targets.each do |target|
    flutter_additional_ios_build_settings(target)
    ## Add these 3 lines to your podfile
    target.build_configurations.each do |config|
      config.build_settings['ENABLE_BITCODE'] = 'NO'
    end
    
  end
end
</code></pre>
<h3 id="run-it">Run it</h3>
<pre class="language-console"><code class="language-console">foo@bar:~$ flutter run
</code></pre>


## Libraries

##### [backend](backend_backend/backend_backend-library.md)
 


##### [bridge](bridge/bridge-library.md)
 


##### [forge](forge/forge-library.md)
 


##### [runevm_fl](runevm_fl/runevm_fl-library.md)
 


##### [runevm_fl_web](runevm_fl_web/runevm_fl_web-library.md)
 








