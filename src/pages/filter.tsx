import React from 'react';
import { api } from '../utils/trpc';
import { SearchForm } from '../components/SearchForm';
import PokemonRow from '../components/PokemonRow';
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
import FilterListIcon from '@mui/icons-material/FilterList';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

export default function TypeFilter() {
  const theme = useTheme();
  const [type, setType] = React.useState<string | null>(null);
  const [hasSearched, setHasSearched] = React.useState(false);
  const query = api.pokemon.getPokemonByType.useQuery(type ?? '', {
    enabled: !!type,
    retry: false, // Don't retry failed queries
  });

  const handleSearch = (value: string) => {
    setType(value);
    setHasSearched(true);
  };

  return (
    <>
      <Head>
        <title>Pokédex - Type Filter</title>
        <meta
          name="description"
          content="Filter Pokémon by type"
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
            <FilterListIcon sx={{ mr: 0.5, fontSize: 20 }} />
            Type Filter
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
            Filter by Type
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enter a Pokémon type to see all Pokémon of that type. Try types like &quot;Fire,&quot; &quot;Water,&quot; or &quot;Electric.&quot;
          </Typography>
        </Paper>

        {/* Search Form */}
        <SearchForm
          placeholder="Enter Pokémon type (e.g. Fire, Water, Electric)"
          buttonText="Filter"
          onSearch={handleSearch}
          isLoading={query.isLoading}
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

          {!query.isLoading && query.data && query.data.length > 0 && (
            <Fade in={true} timeout={800}>
              <Box>
                {query.data.map((pokemon) => (
                  <PokemonRow 
                    key={pokemon.id} 
                    pokemon={{
                      id: pokemon.id ?? 0,
                      name: pokemon.name ?? 'Unknown',
                      sprite: pokemon.sprite ?? '',
                      types: pokemon.types ?? [],
                    }} 
                  />
                ))}
                
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Want to explore more Pokémon?
                  </Typography>
                  <Button 
                    variant="outlined" 
                    component={Link} 
                    href="/individual"
                    sx={{ 
                      mr: 2,
                      borderRadius: 2,
                      textTransform: 'none',
                    }}
                  >
                    Individual Lookup
                  </Button>
                  <Button 
                    variant="outlined" 
                    component={Link} 
                    href="/multiple"
                    sx={{ 
                      borderRadius: 2,
                      textTransform: 'none',
                    }}
                  >
                    Multiple Lookup
                  </Button>
                </Box>
              </Box>
            </Fade>
          )}

          {hasSearched && !query.isLoading && (query.error || !query.data || query.data.length === 0) && (
            <Alert 
              severity="error"
              variant="filled"
              sx={{ 
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                '& .MuiAlert-message': {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {query.error?.message || `No Pokémon found with type "${type}". Please check the spelling and try again.`}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Tip: Try searching for types like "Fire", "Water", or "Electric"
              </Typography>
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
                Enter a Pokémon type above to begin your search
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}