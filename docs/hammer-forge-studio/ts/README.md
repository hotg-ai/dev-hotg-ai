@hotg-ai/forge / [Exports](modules.md)

# The Forge SDK

A client library for interacting with the Forge API.

## Contributing

## Release Process

When making a release you will need to increment the version number then use
the `yarn release` script.

This script will copy `package.json` into the `dist/` folder and makes sure to
run `yarn publish` from there. By doing this, we avoid mentioning `dist/` in the
import path (i.e. you import from `@hotg-ai/forge/telemetry` instead of
`@hotg-ai/forge/dist/telemetry`).

As a precaution, the `package.json` in this folder sets `"private": true` to
make sure you don't accidentally run `yarn publish` directly.

