import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import PokemonRow, { Pokemon } from './PokemonRow';

type Props = {
  pokemon: Pokemon[];
  loading?: boolean;
};

export default function PokedexTable({ pokemon, loading = false }: Props) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!pokemon || pokemon.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No Pokémon found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 2 }}>
      {pokemon.map((poke) => (
        <PokemonRow key={poke.id} pokemon={poke} />
      ))}
    </Box>
  );
}