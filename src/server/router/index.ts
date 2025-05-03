import { router } from '../trpc';
import { pokemonRouter } from './pokemonRouter'; 

export const appRouter = router({
  pokemon: pokemonRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
