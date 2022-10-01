import { createNextApiHandler } from '@trpc/server/adapters/next';
import { createContext } from '../../../server/context';
import { appRouter } from '../../../server/routers/_app';
// eslint-disable-next-line import/extensions
import { env } from '../../../env/server.mjs';

export default createNextApiHandler({
  router: appRouter,
  /**
   * @link https://trpc.io/docs/context
   */
  createContext,
  /**
   * @link https://trpc.io/docs/error-handling
   */
  onError:
    env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path ?? ''}: ${error.message}`);
        }
      : undefined,
  /**
   * Enable query batching
   */
  batching: {
    enabled: true,
  },
  /**
   * @link https://trpc.io/docs/caching#api-response-caching
   */
  // responseMeta() {
  //   // ...
  // },
});
