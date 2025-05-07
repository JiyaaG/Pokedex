import { PrismaClient } from "@prisma/client";
import fetch from 'node-fetch';

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
    // Clear existing data to avoid unique constraint errors
    await prisma.pokemonType.deleteMany({});
    await prisma.type.deleteMany({});
    await prisma.pokemon.deleteMany({});

    const pokemonNames = [
      "bulbasaur", "ivysaur", "venusaur",
      "charmander", "charmeleon", "charizard",
      "squirtle", "wartortle", "blastoise",
      "pikachu", "raichu",
      "jigglypuff", "wigglytuff",
      "meowth", "persian",
      "psyduck", "golduck",
      "snorlax", "gengar", "haunter", "gastly",
      "eevee", "vaporeon", "jolteon", "flareon", "espeon", "umbreon", "leafeon", "glaceon", "sylveon",
      "machop", "machoke", "machamp",
      "abra", "kadabra", "alakazam",
      "mew", "mewtwo",
      "pidgey", "pidgeotto", "pidgeot",
      "rattata", "raticate",
      "nidoran-f", "nidorina", "nidoqueen",
      "nidoran-m", "nidorino", "nidoking",
      "zubat", "golbat", "crobat",
      "oddish", "gloom", "vileplume", "bellossom",
      "diglett", "dugtrio",
      "growlithe", "arcanine",
      "poliwag", "poliwhirl", "poliwrath", "politoed",
      "geodude", "graveler", "golem",
      "magnemite", "magneton", "magnezone",
      "doduo", "dodrio",
      "cubone", "marowak",
      "koffing", "weezing",
      "rhyhorn", "rhydon", "rhyperior",
      "horsea", "seadra", "kingdra",
      "electabuzz", "electivire",
      "magmar", "magmortar",
      "lapras", "ditto", "porygon", "porygon2", "porygon-z",
      "dratini", "dragonair", "dragonite",
      "togepi", "togetic", "togekiss",
      "chikorita", "bayleef", "meganium",
      "cyndaquil", "quilava", "typhlosion",
      "totodile", "croconaw", "feraligatr",
      "lucario", "garchomp", "metagross", "salamence",
      "blaziken", "sceptile", "swampert",
      "tyranitar", "scizor", "heracross"
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
