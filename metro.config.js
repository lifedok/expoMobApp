const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
// eslint-disable-next-line no-undef
const defaultConfig = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});
// config.resolver.sourceExts.push('cjs');
// config.resolver.assetExts.push('cjs');
//
// module.exports = config;

// const defaultConfig = getDefaultConfig(__dirname, {});
const { resolver: defaultResolver } = defaultConfig;
exports.resolver = {
  ...defaultResolver,
  sourceExts: [...defaultResolver.sourceExts, 'cjs'],
};
