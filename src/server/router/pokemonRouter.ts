import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { prisma } from '../db';

export const pokemonRouter = router({
  
  getPokemon: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const pokemon = await prisma.pokemon.findUnique({
        where: { name: input },
        include: {
          types: {
            include: { type: true },
          },
        },
      });

      if (!pokemon) throw new Error('Pokemon not found');

      return {
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprite,
        types: pokemon.types.map((t) => t.type.name),
      };
    }),

  getPokemonArray: publicProcedure
    .input(z.array(z.string()))
    .query(async ({ input }) => {
      const pokemonArray = await prisma.pokemon.findMany({
        where: { name: { in: input } },
        include: {
          types: {
            include: { type: true },
          },
        },
      });

      return pokemonArray.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprite,
        types: pokemon.types.map((t) => t.type.name),
      }));
    }),

  
  getPokemonByType: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const pokemons = await prisma.pokemon.findMany({
        where: {
          types: {
            some: {
              type: {
                name: input, // e.g., "fire"
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

      return pokemons.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprite,
        types: pokemon.types.map((t) => t.type.name),
      }));
    }),
});
