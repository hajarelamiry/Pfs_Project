const { getDefaultConfig } = require("@expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Ajout .mjs pour ESM modules
config.resolver.sourceExts = [...config.resolver.sourceExts, "mjs"];

// Important pour expo-router (active le support des exports)
config.resolver.unstable_enablePackageExports = true;

module.exports = withNativeWind(config, { input: "./global.css" });
