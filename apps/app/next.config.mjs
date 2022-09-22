import { env } from './src/env/server.mjs';
import WithPWA from 'next-pwa';
import withPlugins from 'next-compose-plugins';
import WithBundleAnalyzer from '@next/bundle-analyzer';
import { join } from 'path';
import WithTM from 'next-transpile-modules';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const withTM = WithTM([]);
const withBundleAnalyzer = WithBundleAnalyzer({
  enabled: env.ANALYZE === 'true',
});
const withPWA = WithPWA({
  disable: env.NODE_ENV === 'development',
  dest: 'public',
});

const plugins = [withTM, withBundleAnalyzer, withPWA];

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return withPlugins(plugins, config);
}

export default defineNextConfig({
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
});
