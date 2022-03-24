# What HOT-G has created

We have created a containerization technology using Rust and WebAssembly that can be deployed to edge devices. Just like Docker images package software together with its dependencies, we propose to package ML and application logic into a
container called Rune. It containerizes the whole ML Pipeline (Pre-processing+model+post-processing). The idea is _How do we make a container that can execute withbguarantees with any ML Framework, on any device/sensor and any chipset._ That means our code needs to be able to run on a wide range of environments, varying from x86 servers, mobile platforms like iOS and Android, single board computers like the Raspberry Pi or Jetson Nano, or bare metal devices.

<img width="549" alt="Screenshot 2022-03-24 at 2 26 38 PM" src="https://user-images.githubusercontent.com/50593567/159879555-8057733a-be01-4e07-b3db-da7be841b200.png"/>

Rune can easily be deployed onto different edge devices. By providing a common platform for Rune to run, we have target the fragmented IoT platforms, making it easier for developers to deploy their models on real world devices.
