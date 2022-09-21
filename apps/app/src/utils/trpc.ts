// ℹ️ Type-only import:
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
import { createTRPCClient } from '@trpc/client';
import { createReactQueryHooks } from '@trpc/react';
import superjson from 'superjson';
import type { AppRouter } from '../server/routers/_app';
import { getBaseUrl } from './getBaseUrl';

/**
 * A set of strongly-typed React hooks from your `AppRouter` type signature with `createReactQueryHooks`.
 * @link https://trpc.io/docs/react#3-create-trpc-hooks
 */
export const trpc = createReactQueryHooks<AppRouter>();

export const trpcClient = createTRPCClient<AppRouter>({
  url: `${getBaseUrl()}/api/trpc`,
  transformer: superjson,
});
