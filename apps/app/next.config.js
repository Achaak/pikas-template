require('dotenv-flow').config({ path: '../..' });

const withPWA = require('next-pwa');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withTM = require('next-transpile-modules')([
  '@pikas-template/ui',
  '@pikas-template/translate',
]);

const plugins = [withTM, withBundleAnalyzer, withPWA];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
  },
};

module.exports = withPlugins(plugins, nextConfig);
