require('dotenv-flow').config({ path: '../..' });

const withPWA = require('next-pwa');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { join } = require('path');
const withTM = require('next-transpile-modules')([]);

const plugins = [withTM, withBundleAnalyzer, withPWA];

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: join(__dirname, '../../'),
  },
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
