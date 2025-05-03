import React from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  CircularProgress,
  alpha 
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';

type Props = {
  options: string[];                 
  selectedType: string | undefined;
  onSelect: (type: string | undefined) => void;
  isLoading?: boolean;
};

// Type to color mapping for Pokémon types
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

export function TypeSelector({ options, selectedType, onSelect, isLoading = false }: Props) {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 1.5 
      }}>
        <FilterAltIcon sx={{ mr: 1, color: 'text.secondary' }} />
        <Typography variant="subtitle1" fontWeight="medium">
          Filter by Type
        </Typography>
        {isLoading && (
          <CircularProgress 
            size={20} 
            sx={{ ml: 2 }}
          />
        )}
      </Box>

      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        gap: 1,
        opacity: isLoading ? 0.7 : 1,
        transition: 'opacity 0.2s'
      }}>
        {options.map((type) => {
          const typeColor = typeColors[type.toLowerCase()] || typeColors.default;
          const isSelected = selectedType === type;
          
          return (
            <Button
              key={type}
              onClick={() => onSelect(type)}
              disabled={isLoading}
              sx={{
                textTransform: 'capitalize',
                borderRadius: '16px',
                px: 2,
                py: 0.75,
                backgroundColor: isSelected ? typeColor : 'transparent',
                color: isSelected ? 'white' : typeColor,
                border: `2px solid ${isLoading ? alpha(typeColor, 0.5) : typeColor}`,
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: isSelected 
                    ? typeColor 
                    : `${typeColor}33`, 
                  transform: 'translateY(-2px)',
                  boxShadow: isSelected 
                    ? `0 4px 8px ${typeColor}80` 
                    : 'none',
                },
                '&:disabled': {
                  backgroundColor: isSelected 
                    ? alpha(typeColor, 0.7) 
                    : 'transparent',
                  color: isSelected 
                    ? 'white' 
                    : alpha(typeColor, 0.7),
                  cursor: 'not-allowed',
                },
                transition: 'all 0.2s',
              }}
            >
              {type}
            </Button>
          );
        })}
        
        <Button
          variant="outlined"
          onClick={() => onSelect(undefined)}
          disabled={isLoading}
          startIcon={<ClearIcon />}
          sx={{
            borderRadius: '16px',
            px: 2,
            py: 0.75,
            border: selectedType == null 
              ? '2px solid #3f51b5' 
              : '2px solid rgba(0,0,0,0.23)',
            backgroundColor: selectedType == null 
              ? 'rgba(63,81,181,0.1)' 
              : 'transparent',
            fontWeight: selectedType == null ? 'bold' : 'normal',
            '&:hover': {
              backgroundColor: selectedType == null 
                ? 'rgba(63,81,181,0.2)' 
                : 'rgba(0,0,0,0.04)',
              transform: selectedType == null ? 'translateY(-2px)' : 'none',
            },
            '&:disabled': {
              backgroundColor: selectedType == null 
                ? alpha('#3f51b5', 0.1) 
                : 'transparent',
              opacity: 0.7,
              cursor: 'not-allowed',
            },
            transition: 'all 0.2s',
          }}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
}