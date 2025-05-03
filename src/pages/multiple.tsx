import React from 'react';
import { api } from '../utils/trpc';
import { SearchForm } from '../components/SearchForm';
import { PokemonCard } from '../components/PokemonCard';
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  CircularProgress,
  Chip,
  useTheme,
  alpha,
  Breadcrumbs,
  Link as MuiLink,
  Button,
  Fade,
  Collapse,
  Divider
} from '@mui/material';
import Link from 'next/link';
import Head from 'next/head';
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

export default function MultipleLookup() {
  const theme = useTheme();
  const [names, setNames] = React.useState<string | null>(null);
  const [hasSearched, setHasSearched] = React.useState(false);
  const parsed = names ? names.split(',').map((n) => n.trim()) : [];
  const query = api.pokemon.getPokemonArray.useQuery(parsed, {
    enabled: parsed.length > 0,
  });

  const handleSearch = (value: string) => {
    setNames(value);
    setHasSearched(true);
  };

  return (
    <>
      <Head>
        <title>Pokédex - Multiple Lookup</title>
        <meta
          name="description"
          content="Search for multiple Pokémon by name"
        />
      </Head>

      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Breadcrumbs Navigation */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link href="/" passHref legacyBehavior>
            <MuiLink 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: 'text.secondary',
                '&:hover': { color: theme.palette.primary.main },
              }}
            >
              <HomeIcon sx={{ mr: 0.5, fontSize: 20 }} />
              Home
            </MuiLink>
          </Link>
          <Typography 
            color="text.primary" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              fontWeight: 'medium',
            }}
          >
            <FormatListBulletedIcon sx={{ mr: 0.5, fontSize: 20 }} />
            Multiple Lookup
          </Typography>
        </Breadcrumbs>

        {/* Page Header */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            p: 3,
            mb: 4,
            background: `linear-gradient(to right, ${alpha('#6390F0', 0.1)}, ${alpha('#6390F0', 0.05)})`,
            border: `1px solid ${alpha('#6390F0', 0.2)}`,
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              color: '#6390F0',
            }}
          >
            <CatchingPokemonIcon sx={{ mr: 1.5, fontSize: 32 }} />
            Compare Multiple Pokémon
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Enter multiple Pokémon names separated by commas to view their details side by side.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Example: &quot;pikachu, charizard, bulbasaur&quot;
          </Typography>
        </Paper>

        {/* Search Form */}
        <SearchForm
          placeholder="Enter Pokémon names (comma separated)"
          buttonText="Search"
          onSearch={handleSearch}
        />

        {/* Search Terms Display */}
        {parsed.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Searching for:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {parsed.map((term, index) => (
                <Chip 
                  key={index} 
                  label={term} 
                  size="medium"
                  sx={{ 
                    textTransform: 'capitalize',
                    backgroundColor: alpha('#6390F0', 0.1),
                    border: `1px solid ${alpha('#6390F0', 0.3)}`,
                    fontWeight: 'medium',
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Results Area */}
        <Box sx={{ minHeight: 300 }}>
          {query.isLoading && (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center', 
              alignItems: 'center',
              py: 8
            }}>
              <CircularProgress 
                size={60} 
                thickness={4} 
                sx={{ color: '#6390F0', mb: 3 }} 
              />
              <Typography variant="body2" color="text.secondary">
                Catching Pokémon... Please wait!
              </Typography>
            </Box>
          )}

          {!query.isLoading && query.data && query.data.length > 0 && (
            <Fade in={true} timeout={500}>
              <Box>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Results ({query.data.length} Pokémon found)
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  {query.data.map((pokemon, index) => (
                    <Collapse 
                      key={pokemon.id} 
                      in={true} 
                      timeout={500 + (index * 200)}
                    >
                      <PokemonCard pokemon={pokemon} />
                    </Collapse>
                  ))}
                </Box>
                
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Button 
                    variant="outlined" 
                    component={Link} 
                    href="/filter"
                    sx={{ 
                      mr: 2,
                      borderRadius: 2,
                      textTransform: 'none',
                    }}
                  >
                    Browse by Type
                  </Button>
                  <Button 
                    variant="contained" 
                    onClick={() => {
                      setNames('');
                      setHasSearched(false);
                    }}
                    sx={{ 
                      borderRadius: 2,
                      textTransform: 'none',
                      background: 'linear-gradient(45deg, #6390F0 30%, #96BAFF 90%)',
                    }}
                  >
                    New Search
                  </Button>
                </Box>
              </Box>
            </Fade>
          )}

          {hasSearched && !query.isLoading && query.data && query.data.length === 0 && (
            <Alert 
              severity="info" 
              variant="filled"
              sx={{ 
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              No Pokémon found with the provided names. Please check the spelling and try again.
            </Alert>
          )}

          {!hasSearched && !query.isLoading && (
            <Box 
              sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
                opacity: 0.7,
              }}
            >
              <FormatListBulletedIcon 
                sx={{ 
                  fontSize: 60, 
                  mb: 2,
                  color: alpha(theme.palette.text.secondary, 0.5),
                }} 
              />
              <Typography variant="body1" color="text.secondary" align="center">
                Enter multiple Pokémon names separated by commas above
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}