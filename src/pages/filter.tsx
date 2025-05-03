import React from 'react';
import { api} from '../utils/trpc';
import { TypeSelector } from '../components/TypeSelector';
import { PokemonCard } from '../components/PokemonCard';

const allTypes = ['grass', 'fire', 'water']; // you can fetch dynamically too

export default function TypeFilter() {
  const [type, setType] = React.useState<string | undefined>(undefined);
  const query = api.pokemon.getPokemonByType.useQuery(type ?? '', {
    enabled: !!type,
  });

  return (
    <>
      <TypeSelector
        options={allTypes}
        selectedType={type}
        onSelect={setType}
      />
      {query.isLoading && <div>Loading...</div>}
      {query.data?.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </>
  );
}
