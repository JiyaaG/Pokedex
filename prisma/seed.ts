import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";

const prisma = new PrismaClient();

type PokemonAPIResponse = {
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
};

async function main() {
  try {
    const pokemonNames = [
      "bulbasaur",
      "charmander",
      "squirtle",
      "pikachu",
      "jigglypuff",
      "meowth",
      "psyduck",
      "snorlax",
      "gengar",
      "eevee",
    ];

    for (const name of pokemonNames) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

      if (!res.ok) {
        throw new Error(`Failed to fetch ${name}: ${res.statusText}`);
      }

      const data = (await res.json()) as PokemonAPIResponse;

      const sprite = data.sprites.front_default;
      const types = data.types.map((t) => t.type.name);

      const typeRecords = [];

      for (const typeName of types) {
        const type = await prisma.type.upsert({
          where: { name: typeName },
          update: {},
          create: { name: typeName },
        });
        typeRecords.push(type);
      }

      const pokemon = await prisma.pokemon.create({
        data: {
          name: data.name,
          sprite: sprite,
          types: {
            create: typeRecords.map((type) => ({
              type: {
                connect: { id: type.id },
              },
            })),
          },
        },
      });

      console.log(`Created: ${pokemon.name}`);
    }
  } catch (e) {
    console.error("Seeding error:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
