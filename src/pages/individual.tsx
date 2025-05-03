import React from 'react';
import { api } from '../utils/trpc';
import { SearchForm } from '../components/SearchForm';
import { PokemonCard } from '../components/PokemonCard';

export default function IndividualLookup() {
  const [name, setName] = React.useState<string | null>(null);
  const query = api.pokemon.getPokemon.useQuery(name ?? '', {
    enabled: !!name,
  });

  return (
    <>
      <SearchForm
        placeholder="Enter Pokémon name (e.g. Bulbasaur)"
        buttonText="Search"
        onSearch={(value: string) => setName(value)}
      />
      {query.isLoading && <div>Loading...</div>}
      {query.data && <PokemonCard pokemon={query.data} />}
      {query.data === null && <div>No Pokémon found.</div>}
    </>
  );
}
