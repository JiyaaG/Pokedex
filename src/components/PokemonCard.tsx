import React from 'react';
import {
  Card,
  Avatar,
  Typography,
  Chip,
  Box,
  useTheme,
} from '@mui/material';

// Define Pokemon type interface
export type Pokemon = {
  id: number;
  name: string;
  sprite: string;
  types: string[];
};

type Props = {
  pokemon: Pokemon;
};

// Type to color mapping
const typeColors: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
  // Fallback
  default: '#777777'
};

export function PokemonCard({ pokemon }: Props) {
  const theme = useTheme();
  
  // Get the primary type color for the card's gradient background
  const primaryType = pokemon.types[0] || 'default';
  const primaryColor = typeColors[primaryType.toLowerCase()] || typeColors.default;
  const secondaryColor = typeColors[pokemon.types[1]?.toLowerCase()] || 
                         primaryColor.replace(')', ', 0.7)').replace('rgb', 'rgba');

  return (
    <Card
      elevation={4}
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2.5,
        borderRadius: 4,
        mb: 3,
        position: 'relative',
        overflow: 'visible',
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        color: theme.palette.getContrastText(primaryColor),
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: `0 12px 20px -10px ${primaryColor}`,
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          fontSize: '0.8rem',
          fontWeight: 'bold',
          opacity: 0.7,
        }}
      >
        #{pokemon.id.toString().padStart(3, '0')}
      </Box>
      
      <Avatar
        src={pokemon.sprite}
        alt={pokemon.name}
        sx={{
          width: 80,
          height: 80,
          mr: 2.5,
          border: '4px solid rgba(255,255,255,0.5)',
          backgroundColor: 'rgba(255,255,255,0.2)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        }}
      />
      
      <Box flexGrow={1}>
        <Typography 
          variant="h5" 
          sx={{ 
            textTransform: 'capitalize',
            fontWeight: 'bold',
            letterSpacing: '0.5px',
          }}
        >
          {pokemon.name}
        </Typography>
        
        <Box mt={1.5}>
          {pokemon.types.map((type) => (
            <Chip
              key={type}
              label={type}
              size="small"
              sx={{
                mr: 1,
                mb: 0.5,
                textTransform: 'capitalize',
                fontWeight: 'bold',
                backgroundColor: 'rgba(255,255,255,0.3)',
                color: 'inherit',
                border: '1px solid rgba(255,255,255,0.5)',
              }}
            />
          ))}
        </Box>
      </Box>
    </Card>
  );
}