export type Env = 'dev' | 'prod';

export const getEnv = (): Env => {
  const env = process.env.NODE_ENV;
  if (!env) {
    return 'prod';
  }

  switch (env) {
    case 'production':
      return 'prod';
    case 'development':
      return 'dev';
    default:
      return 'prod';
  }
};

export const getEnvWindow = (): Env => {
  if (typeof window === 'undefined') {
    const env = process.env.NEXT_PUBLIC_ENVIRONMENT;

    if (!env) {
      return 'prod';
    }

    switch (env) {
      case 'production':
        return 'prod';
      case 'development':
        return 'dev';
      default:
        return 'prod';
    }
  }

  if (window.location.hostname.includes('dev.')) {
    return 'dev';
  }
  if (window.location.hostname.includes('prod.')) {
    return 'prod';
  }
  if (window.location.hostname.includes('localhost')) {
    return 'dev';
  }

  return 'prod';
};

export const getLink = ({
  path,
  app,
  env,
}: {
  path?: string;
  app: 'app' | 'lp';
  env?: Env;
}): string => {
  env = env ?? getEnvWindow();

  let envStr = '';
  if (env === 'dev') {
    envStr = 'dev.';
  }

  let subdomain = `${app}.`;
  if (app === 'lp') {
    subdomain = '';
  }

  let protocol = 'https://';
  let domain = 'pikas-template.com';
  if (process.env.NODE_ENV === 'development') {
    domain = 'localhost:3000';
    envStr = '';
    subdomain = '';
    protocol = 'http://';
  }

  if (path) {
    if (!path.startsWith('/')) {
      path = `/${path}`;
    }
  } else {
    path = '';
  }

  return `${protocol}${subdomain}${envStr}${domain}${path}`;
};
