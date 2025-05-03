import React from 'react';
import { api } from '../utils/trpc';
import { TypeSelector } from '../components/TypeSelector';
// import FilterablePokedexTable from '../components/filterablePokedexTable'; 
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
  Grid,
  Pagination,
  Fade,
  Divider
} from '@mui/material';
import Link from 'next/link';
import Head from 'next/head';
import HomeIcon from '@mui/icons-material/Home';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PokedexTable from '../components/PokedexTable'; 

// Type color mapping
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

// For this example, we'll use more types than the three in your original code
const allTypes = [
  'grass', 'fire', 'water', 'electric', 'psychic', 
  'fighting', 'rock', 'ground', 'flying', 'bug'
];

export default function TypeFilter() {
  const theme = useTheme();
  const [type, setType] = React.useState<string | undefined>(undefined);
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 6;
  
  // Get the color for the selected type
  const typeColor = type ? typeColors[type.toLowerCase()] || typeColors.default : theme.palette.primary.main;
  
  const query = api.pokemon.getPokemonByType.useQuery(type ?? '', {
    enabled: !!type,
  });
  
  // Pagination logic
  const totalPages = query.data ? Math.ceil(query.data.length / itemsPerPage) : 0;
  const currentPageData = query.data 
    ? query.data.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : [];
  
  // Reset to page 1 when type changes
  React.useEffect(() => {
    setPage(1);
  }, [type]);

  return (
    <>
      <Head>
        <title>Pokédex - Type Filter</title>
        <meta
          name="description"
          content="Browse Pokémon by their type"
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
            <FilterAltIcon sx={{ mr: 0.5, fontSize: 20 }} />
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
            background: `linear-gradient(to right, ${alpha('#7AC74C', 0.1)}, ${alpha('#7AC74C', 0.05)})`,
            border: `1px solid ${alpha('#7AC74C', 0.2)}`,
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              color: '#7AC74C',
            }}
          >
            <CatchingPokemonIcon sx={{ mr: 1.5, fontSize: 32 }} />
            Browse by Type
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Select a Pokémon type to see all Pokémon of that type. Each type has unique strengths and weaknesses.
          </Typography>
        </Paper>

        {/* Type Selector */}
        <Box sx={{ mb: 4 }}>
          <TypeSelector
            options={allTypes}
            selectedType={type}
            onSelect={setType}
          />
        </Box>

        {/* Selected Type Info (when a type is selected) */}
        {type && (
          <Fade in={true} timeout={300}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 3,
                borderRadius: 2,
                backgroundColor: alpha(typeColor, 0.1),
                border: `1px solid ${alpha(typeColor, 0.3)}`,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <EmojiEventsIcon 
                sx={{ 
                  color: typeColor,
                  mr: 1.5,
                  fontSize: 24
                }}
              />
              <Typography 
                variant="subtitle1"
                sx={{ 
                  fontWeight: 'medium',
                  textTransform: 'capitalize',
                  color: typeColor
                }}
              >
                {type} Type Pokémon
                {query.data && (
                  <Typography 
                    component="span" 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    ({query.data.length} found)
                  </Typography>
                )}
              </Typography>
            </Paper>
          </Fade>
        )}

        {/* Results Section */}
        <Box sx={{ minHeight: 300 }}>
          {/* Loading State */}
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
                sx={{ color: typeColor, mb: 3 }} 
              />
              <Typography variant="body2" color="text.secondary">
                Searching for {type} type Pokémon...
              </Typography>
            </Box>
          )}

          {/* Empty State */}
          {!query.isLoading && type && query.data && query.data.length === 0 && (
            <Alert 
              severity="info" 
              variant="filled"
              sx={{ 
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              No Pokémon found for the {type} type.
            </Alert>
          )}

          {/* No Type Selected State */}
          {!type && !query.isLoading && (
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
              <FilterAltIcon 
                sx={{ 
                  fontSize: 60, 
                  mb: 2,
                  color: alpha(theme.palette.text.secondary, 0.5),
                }} 
              />
              <Typography variant="body1" color="text.secondary" align="center">
                Select a type above to view Pokémon
              </Typography>
            </Box>
          )}

          {/* Results */}
          {!query.isLoading && query.data && query.data.length > 0 && (
            <Fade in={true} timeout={500}>
              <Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {type} Type Pokémon
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                </Box>

                <Grid container spacing={3}>
                  {currentPageData.map((pokemon, index) => (
                    <Grid item xs={12} sm={6} key={pokemon.id}>
                      <Box sx={{ 
                        opacity: 1,
                        animation: 'fadeIn 0.3s ease-in-out',
                        animationDelay: `${index * 100}ms`,
                      }}>
                        <PokedexTable pokemon={[pokemon]} />
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    mt: 4, 
                    mb: 2 
                  }}>
                    <Pagination 
                      count={totalPages} 
                      page={page}
                      onChange={(e, value) => setPage(value)}
                      color="primary"
                      size="large"
                      siblingCount={1}
                      shape="rounded"
                    />
                  </Box>
                )}
              </Box>
            </Fade>
          )}
        </Box>
      </Container>
    </>
  );
}