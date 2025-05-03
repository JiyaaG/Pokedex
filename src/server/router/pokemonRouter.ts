import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { prisma } from '../db';
import { TRPCError } from '@trpc/server';

// Cache for rate limiting
const requestCache = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 60; // 60 requests per minute

// List of available Pokémon for suggestions
const availablePokemon = [
  "bulbasaur", "charmander", "squirtle", "pikachu", "jigglypuff",
  "meowth", "psyduck", "snorlax", "gengar", "eevee"
];

// List of available types for suggestions
const availableTypes = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

// Helper function for rate limiting
function checkRateLimit(key: string) {
  const now = Date.now();
  const cache = requestCache.get(key);

  if (!cache) {
    requestCache.set(key, { count: 1, timestamp: now });
    return;
  }

  if (now - cache.timestamp > RATE_LIMIT_WINDOW) {
    requestCache.set(key, { count: 1, timestamp: now });
    return;
  }

  if (cache.count >= MAX_REQUESTS) {
    throw new TRPCError({
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many requests. Please try again in a minute.',
    });
  }

  cache.count++;
  requestCache.set(key, cache);
}

// Helper function for finding similar names
function findSimilarNames(input: string, list: string[]): string[] {
  const inputLower = input.toLowerCase();
  return list.filter(name => 
    name.includes(inputLower) || 
    inputLower.includes(name) ||
    levenshteinDistance(inputLower, name) <= 2
  );
}

// Levenshtein distance for better string matching
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + substitutionCost
      );
    }
  }

  return matrix[b.length][a.length];
}

export const pokemonRouter = router({
  getPokemon: publicProcedure
    .input(z.string().min(2, 'Pokémon name must be at least 2 characters'))
    .query(async ({ input }) => {
      try {
        checkRateLimit('getPokemon');

        const pokemon = await prisma.pokemon.findUnique({
          where: { name: input.toLowerCase() },
          include: {
            types: {
              include: { type: true },
            },
          },
        });

        if (!pokemon) {
          const similarNames = findSimilarNames(input, availablePokemon);
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `No Pokémon found with name "${input}".${
              similarNames.length > 0 
                ? ` Did you mean: ${similarNames.join(', ')}?` 
                : ' Available Pokémon are: ' + availablePokemon.join(', ')
            }`,
          });
        }

        return {
          id: pokemon.id,
          name: pokemon.name,
          sprite: pokemon.sprite,
          types: pokemon.types.map((t) => t.type.name),
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        console.error('Pokemon search error:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred while searching for the Pokémon. Please try again later.',
        });
      }
    }),

  getPokemonArray: publicProcedure
    .input(z.array(z.string().min(2, 'Each Pokémon name must be at least 2 characters')))
    .query(async ({ input }) => {
      try {
        checkRateLimit('getPokemonArray');

        if (input.length > 10) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'You can search for a maximum of 10 Pokémon at once.',
          });
        }

        const pokemonArray = await prisma.pokemon.findMany({
          where: { name: { in: input.map(name => name.toLowerCase()) } },
          include: {
            types: {
              include: { type: true },
            },
          },
        });

        const foundNames = new Set(pokemonArray.map(p => p.name));
        const notFoundNames = input.filter(name => !foundNames.has(name.toLowerCase()));

        if (notFoundNames.length > 0) {
          const suggestions = notFoundNames.map(name => {
            const similarNames = findSimilarNames(name, availablePokemon);
            return similarNames.length > 0 
              ? `"${name}" - Did you mean: ${similarNames.join(', ')}?`
              : `"${name}"`;
          });

          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `The following Pokémon were not found: ${suggestions.join('; ')}. Available Pokémon are: ${availablePokemon.join(', ')}`,
          });
        }

        return pokemonArray.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          sprite: pokemon.sprite,
          types: pokemon.types.map((t) => t.type.name),
        }));
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        console.error('Pokemon array search error:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred while searching for the Pokémon. Please try again later.',
        });
      }
    }),

  getPokemonByType: publicProcedure
    .input(z.string().min(2, 'Type name must be at least 2 characters'))
    .query(async ({ input }) => {
      try {
        checkRateLimit('getPokemonByType');

        const pokemons = await prisma.pokemon.findMany({
          where: {
            types: {
              some: {
                type: {
                  name: input.toLowerCase(),
                },
              },
            },
          },
          include: {
            types: {
              include: { type: true },
            },
          },
        });

        if (pokemons.length === 0) {
          const similarTypes = findSimilarNames(input, availableTypes);
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `No Pokémon found with type "${input}".${
              similarTypes.length > 0 
                ? ` Did you mean: ${similarTypes.join(', ')}?` 
                : ' Available types are: ' + availableTypes.join(', ')
            }`,
          });
        }

        return pokemons.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          sprite: pokemon.sprite,
          types: pokemon.types.map((t) => t.type.name),
        }));
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        console.error('Pokemon type search error:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred while searching for Pokémon by type. Please try again later.',
        });
      }
    }),
});
