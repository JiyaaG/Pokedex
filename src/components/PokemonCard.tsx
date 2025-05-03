import React from 'react';
import {
  Card,
  Avatar,
  Typography,
  Chip,
  Box,
} from '@mui/material';

export type Pokemon = {
  id: number;
  name: string;
  sprite: string;
  types: string[];
};

type Props = {
  pokemon: Pokemon;
};

export function PokemonCard({ pokemon }: Props) {
  return (
    <Card
      elevation={3}
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        borderRadius: 2,
        mb: 2,
      }}
    >
      <Avatar
        src={pokemon.sprite}
        alt={pokemon.name}
        sx={{ width: 64, height: 64, mr: 2 }}
      />
      <Box flexGrow={1}>
        <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
          {pokemon.name}
        </Typography>
        <Typography variant="subtitle2">ID: #{pokemon.id.toString().padStart(3, '0')}</Typography>
        <Box mt={1}>
          {pokemon.types.map((t) => (
            <Chip
              key={t}
              label={t}
              size="small"
              sx={{ mr: 1, textTransform: 'capitalize' }}
            />
          ))}
        </Box>
      </Box>
    </Card>
  );
}
