const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { addLiveStoreDevtoolsMiddleware } = require("@livestore/devtools-expo");

const config = getDefaultConfig(__dirname);
addLiveStoreDevtoolsMiddleware(config, {
  schemaPath: "./livestore/schema.ts",
});

config.resolver.unstable_enablePackageExports = false;
module.exports = withNativeWind(config, { input: "./global.css" });
