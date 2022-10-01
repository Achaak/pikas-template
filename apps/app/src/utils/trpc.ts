import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type {} from '../pages/api/trpc/[trpc]';
import type { AppRouter } from '../server/routers/_app';
import superjson from 'superjson';

const getBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    // browser should use relative path
    return '';
  }
  if (process.env.VERCEL_URL) {
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${
      process.env.PORT ?? 3000
    }`;
  }
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

const links = [
  loggerLink({
    enabled: (opts) =>
      process.env.NODE_ENV === 'development' ||
      (opts.direction === 'down' && opts.result instanceof Error),
  }),
  httpBatchLink({
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     **/
    url: `${getBaseUrl()}/api/trpc`,
  }),
];

export const trpcProxy = createTRPCProxyClient<AppRouter>({
  links,
  transformer: superjson,
});

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links,
      transformer: superjson,
      /**
       * @link https://react-query-v3.tanstack.com/reference/QueryClient
       **/
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: false,
});
// => { useQuery: ..., useMutation: ...}
