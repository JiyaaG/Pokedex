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
  useTheme,
  alpha,
  Breadcrumbs,
  Link as MuiLink,
  Button,
  Fade
} from '@mui/material';
import Link from 'next/link';
import Head from 'next/head';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

export default function IndividualLookup() {
  const theme = useTheme();
  const [name, setName] = React.useState<string | null>(null);
  const [hasSearched, setHasSearched] = React.useState(false);
  const query = api.pokemon.getPokemon.useQuery(name ?? '', {
    enabled: !!name,
  });

  const handleSearch = (value: string) => {
    setName(value);
    setHasSearched(true);
  };

  return (
    <>
      <Head>
        <title>Pokédex - Individual Lookup</title>
        <meta
          name="description"
          content="Search for individual Pokémon by name"
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
            <SearchIcon sx={{ mr: 0.5, fontSize: 20 }} />
            Individual Lookup
          </Typography>
        </Breadcrumbs>

        {/* Page Header */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            p: 3,
            mb: 4,
            background: `linear-gradient(to right, ${alpha('#EE8130', 0.1)}, ${alpha('#EE8130', 0.05)})`,
            border: `1px solid ${alpha('#EE8130', 0.2)}`,
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              color: '#EE8130',
            }}
          >
            <CatchingPokemonIcon sx={{ mr: 1.5, fontSize: 32 }} />
            Find Your Pokémon
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enter the name of any Pokémon to see its details. Try names like &quot;Pikachu,&quot; &quot;Charizard,&quot; or &quot;Eevee.&quot;
          </Typography>
        </Paper>

        {/* Search Form */}
        <SearchForm
          placeholder="Enter Pokémon name (e.g. Bulbasaur)"
          buttonText="Search"
          onSearch={handleSearch}
        />

        {/* Results Area */}
        <Box sx={{ minHeight: 300 }}>
          {query.isLoading && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              py: 8
            }}>
              <CircularProgress 
                size={60} 
                thickness={4} 
                sx={{ color: '#EE8130' }} 
              />
            </Box>
          )}

          {!query.isLoading && query.data && (
            <Fade in={true} timeout={800}>
              <Box>
                <PokemonCard pokemon={query.data} />
                
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Want to explore more Pokémon?
                  </Typography>
                  <Button 
                    variant="outlined" 
                    component={Link} 
                    href="/multiple"
                    sx={{ 
                      mr: 2,
                      borderRadius: 2,
                      textTransform: 'none',
                    }}
                  >
                    Multiple Lookup
                  </Button>
                  <Button 
                    variant="outlined" 
                    component={Link} 
                    href="/filter"
                    sx={{ 
                      borderRadius: 2,
                      textTransform: 'none',
                    }}
                  >
                    Browse by Type
                  </Button>
                </Box>
              </Box>
            </Fade>
          )}

          {hasSearched && !query.isLoading && query.data === null && (
            <Alert 
              severity="info" 
              variant="filled"
              sx={{ 
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              No Pokémon found with name &quot;{name}&quot;. Please check the spelling and try again.
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
              <CatchingPokemonIcon 
                sx={{ 
                  fontSize: 60, 
                  mb: 2,
                  color: alpha(theme.palette.text.secondary, 0.5),
                }} 
              />
              <Typography variant="body1" color="text.secondary">
                Enter a Pokémon name above to begin your search
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}