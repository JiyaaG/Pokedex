import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '../../../server/router'; // adjust path as needed

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}), // Can customize if needed
  onError: ({ error, type, path, input, ctx, req }) => {
    console.error('tRPC Error:', {
      error: error.message,
      type,
      path,
      input,
      stack: error.stack,
    });
  },
});
