import React, { useState, FormEvent, useEffect, useCallback } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  InputAdornment,
  alpha,
  FormHelperText,
  Autocomplete,
  CircularProgress,
  Paper,
  Typography,
  Popper,
  styled
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import debounce from 'lodash/debounce';

// List of available Pokémon for suggestions
const availablePokemon = [
  "bulbasaur", "charmander", "squirtle", "pikachu", "jigglypuff",
  "meowth", "psyduck", "snorlax", "gengar", "eevee"
];

// Custom styled Popper for better autocomplete dropdown
const StyledPopper = styled(Popper)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '15px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    backgroundColor: alpha(theme.palette.background.paper, 0.95),
  },
}));

type Props = {
  placeholder: string;
  buttonText: string;
  onSearch: (value: string) => void;
  isLoading?: boolean;
};

export function SearchForm({ placeholder, buttonText, onSearch, isLoading = false }: Props) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [open, setOpen] = useState(false);

  // Effect to handle loading state
  useEffect(() => {
    if (isLoading) {
      setOpen(false);
      setSuggestions([]);
      setIsSearching(false);
    }
  }, [isLoading]);

  // Debounced search function with better state management
  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm.length >= 2 && !isLoading) {
        const filtered = availablePokemon.filter(pokemon =>
          pokemon.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSuggestions(filtered);
        setIsSearching(false);
        setOpen(filtered.length > 0);
      } else {
        setSuggestions([]);
        setOpen(false);
      }
    }, 300),
    [isLoading]
  );

  // Clean up debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!value.trim()) {
      setError('Please enter a Pokémon name');
      return;
    }
    
    if (value.trim().length < 2) {
      setError('Pokémon name must be at least 2 characters');
      return;
    }
    
    if (!/^[a-zA-Z\s-]+$/.test(value.trim())) {
      setError('Pokémon name can only contain letters, spaces, and hyphens');
      return;
    }
    
    setOpen(false);
    setSuggestions([]);
    setIsSearching(false);
    onSearch(value.trim());
  };

  const handleInputChange = (event: React.ChangeEvent<{}>, newInputValue: string) => {
    setInputValue(newInputValue);
    setError('');
    
    if (!isLoading && newInputValue.trim()) {
      setIsSearching(true);
      debouncedSearch(newInputValue);
    } else {
      setSuggestions([]);
      setOpen(false);
    }
  };

  const handleAutocompleteChange = (event: React.ChangeEvent<{}>, newValue: string | null) => {
    setValue(newValue || '');
    if (newValue) {
      setOpen(false);
      setSuggestions([]);
      setIsSearching(false);
      onSearch(newValue.trim());
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !open) {
      handleSubmit(event as any);
    }
  };
  
  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        mb: 3,
        position: 'relative',
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Autocomplete
          freeSolo
          fullWidth
          value={value}
          onChange={handleAutocompleteChange}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          options={suggestions}
          open={open && !isLoading}
          onClose={() => {
            setOpen(false);
            setIsSearching(false);
          }}
          PopperComponent={StyledPopper}
          renderOption={(props, option) => (
            <Box 
              component="li" 
              {...props}
              sx={{ 
                p: 1.5,
                '&:hover': {
                  backgroundColor: alpha('#FF1B1B', 0.1),
                },
                '&[aria-selected="true"]': {
                  backgroundColor: alpha('#FF1B1B', 0.15),
                }
              }}
            >
              <CatchingPokemonIcon 
                sx={{ 
                  mr: 1.5, 
                  color: alpha('#FF1B1B', 0.7),
                  fontSize: 20
                }} 
              />
              <Typography 
                sx={{ 
                  textTransform: 'capitalize',
                  fontWeight: 500
                }}
              >
                {option}
              </Typography>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              error={!!error}
              onKeyDown={handleKeyDown}
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
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color={error ? "error" : "action"} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <>
                    {(isSearching || isLoading) && (
                      <CircularProgress 
                        color="inherit" 
                        size={20} 
                        sx={{ mr: 1 }}
                      />
                    )}
                    {params.InputProps.endAdornment}
                  </>
                ),
                'aria-label': 'Search for a Pokémon',
                'aria-expanded': open,
                role: 'combobox',
              }}
            />
          )}
          ListboxProps={{
            'aria-label': 'Pokémon suggestions',
            role: 'listbox',
          }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          size="large"
          disabled={isLoading}
          startIcon={isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <CatchingPokemonIcon />
          )}
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
            '&:disabled': {
              background: 'linear-gradient(45deg, #999 30%, #BBB 90%)',
              boxShadow: 'none',
            },
            transition: 'all 0.2s'
          }}
          aria-label={isLoading ? 'Searching...' : 'Search for Pokémon'}
        >
          {isLoading ? 'Searching...' : buttonText}
        </Button>
      </Box>
      {error && (
        <FormHelperText 
          error 
          sx={{ 
            ml: 2, 
            mt: 1,
            fontSize: '0.9rem',
            fontWeight: 500
          }}
          role="alert"
        >
          {error}
        </FormHelperText>
      )}
    </Box>
  );
}