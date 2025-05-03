import React from 'react';
import { api } from '../utils/trpc';
import { SearchForm } from '../components/SearchForm';
import { PokemonCard } from '../components/PokemonCard';

export default function MultipleLookup() {
  const [names, setNames] = React.useState<string | null>(null);
  const parsed = names ? names.split(',').map((n) => n.trim()) : [];
  const query = api.pokemon.getPokemonArray.useQuery(parsed, {
    enabled: parsed.length > 0,
  });

  return (
    <>
      <SearchForm
        placeholder="Enter Pokémon names (comma separated)"
        buttonText="Search"
        onSearch={setNames}
      />
      {query.isLoading && <div>Loading...</div>}
      {query.data?.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </>
  );
}
