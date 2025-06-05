/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { addLiveStoreDevtoolsMiddleware } = require("@livestore/devtools-expo");

addLiveStoreDevtoolsMiddleware(config, {
  schemaPath: "./livestore/schema.ts",
});

config.resolver.unstable_enablePackageExports = false;
module.exports = withNativeWind(config, { input: "./global.css" });

module.exports = config;