import React, { useState, FormEvent } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  InputAdornment,
  alpha
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

type Props = {
  placeholder: string;
  buttonText: string;
  onSearch: (value: string) => void;
};

export function SearchForm({ placeholder, buttonText, onSearch }: Props) {
  const [value, setValue] = useState('');
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };
  
  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        display: 'flex', 
        mb: 3,
        position: 'relative',
        width: '100%',
      }}
    >
      <TextField
        fullWidth
        size="medium"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '30px',
            pr: 1,
            backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.8),
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            '&:hover': {
              boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
            }
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
      <Button 
        type="submit" 
        variant="contained" 
        size="large"
        startIcon={<CatchingPokemonIcon />}
        sx={{ 
          ml: 1.5, 
          borderRadius: '30px',
          px: 3,
          boxShadow: '0 4px 10px rgba(255,0,0,0.25)',
          background: 'linear-gradient(45deg, #FF1B1B 30%, #FF5C5C 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #E50000 30%, #FF3939 90%)',
            boxShadow: '0 6px 14px rgba(255,0,0,0.4)',
            transform: 'translateY(-2px)'
          },
          transition: 'all 0.2s'
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
}