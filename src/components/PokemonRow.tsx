import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Stack, 
  Box, 
  Chip 
} from "@mui/material";

export type Pokemon = {
  id: number;
  name: string;
  sprite: string;
  types: string[];
};

type Props = {
  pokemon: Pokemon;
};

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
  default: '#777777'
};

export default function PokemonRow({ pokemon }: Props) {
  const primaryType = pokemon.types[0]?.toLowerCase() || 'default';
  const primaryColor = typeColors[primaryType] || typeColors.default;
  
  return (
    <Card 
      sx={{ 
        mb: 2.5,
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateX(5px)',
        },
        boxShadow: 'none', 
      }}
    >
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '5px',
          height: '100%',
          backgroundColor: primaryColor,
        }}
      />
      
      <CardContent sx={{ pl: 3 }}>
        <Stack direction="row" alignItems="center" spacing={3}>
          <Avatar 
            src={pokemon.sprite} 
            alt={pokemon.name} 
            variant="square"
            sx={{ 
              width: 120,  
              height: 120, 
              border: `2px solid ${primaryColor}`,
              backgroundColor: `${primaryColor}22`,
              boxShadow: 'none', 
            }} 
          />
          
          <Box>
  <Typography 
    variant="h6" 
    sx={{ 
      textTransform: 'capitalize',
      fontWeight: 'bold',
    }}
  >
    {pokemon.name}
  </Typography>

  <Typography 
    variant="body2" 
    color="text.secondary" 
    sx={{ 
      fontSize: '0.85rem',
      fontWeight: 500,
      mt: 0.5,
    }}
  >
    #{pokemon.id.toString().padStart(3, '0')}
  </Typography>

  <Box mt={1}>
    {pokemon.types.map((type) => {
      const typeColor = typeColors[type.toLowerCase()] || typeColors.default;
      return (
        <Chip
          key={type}
          label={type}
          size="small"
          sx={{
            mr: 1,
            textTransform: 'capitalize',
            backgroundColor: `${typeColor}22`,
            color: typeColor,
            border: `1px solid ${typeColor}`,
            fontWeight: 'medium',
          }}
        />
      );
    })}
  </Box>
</Box>

        </Stack>
      </CardContent>
    </Card>
  );
}
