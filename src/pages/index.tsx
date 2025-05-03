import Head from 'next/head';
import Link from 'next/link';
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Button,
  useTheme,
  alpha,
  Paper,
} from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

// Card data with icons
const cardData = [
  {
    title: 'Individual Lookup',
    description: 'Search for a single Pokémon by name.',
    href: '/individual',
    icon: <SearchIcon fontSize="large" />,
    color: '#EE8130', // Fire type color
  },
  {
    title: 'Multiple Lookup',
    description: 'Search for multiple Pokémon (comma-separated).',
    href: '/multiple',
    icon: <FormatListBulletedIcon fontSize="large" />,
    color: '#6390F0', // Water type color
  },
  {
    title: 'Type Filter',
    description: 'Browse all Pokémon of a selected type.',
    href: '/filter',
    icon: <FilterAltIcon fontSize="large" />,
    color: '#7AC74C', // Grass type color
  },
];

export default function Home() {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>Pokédex Home</title>
        <meta
          name="description"
          content="Navigate to individual, multiple, or type-filtered lookup"
        />
      </Head>

      {/* Navbar */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          background: 'linear-gradient(90deg, #FF1B1B 30%, #CC0000 90%)',
          mb: 4,
        }}
      >
        <Toolbar>
          <Box 
            display="flex" 
            alignItems="center" 
            flexGrow={1}
            component={Link}
            href="/"
            sx={{ textDecoration: 'none', color: 'white' }}
          >
            <CatchingPokemonIcon 
              sx={{ 
                fontSize: 36, 
                mr: 2,
                filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.2))',
                animation: 'spin 10s linear infinite',
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                },
              }} 
            />
            <Typography 
              variant="h4" 
              component="div" 
              sx={{ 
                fontWeight: 'bold',
                letterSpacing: '0.5px',
                textShadow: '2px 2px 3px rgba(0,0,0,0.2)',
              }}
            >
              Pokédex
            </Typography>
          </Box>
          
          <Box>
            <Button 
              color="inherit" 
              component={Link}
              href="/individual"
              sx={{ 
                ml: 1,
                fontWeight: 'bold',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
              }}
            >
              Search
            </Button>
            <Button 
              color="inherit"
              component={Link}
              href="/filter"
              sx={{ 
                ml: 1,
                fontWeight: 'bold',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
              }}
            >
              Browse Types
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        {/* Hero Section */}
        <Paper 
          elevation={0}
          sx={{
            borderRadius: 4,
            p: 5,
            mb: 6,
            background: `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.primary.main, 0.1)})`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            textAlign: 'center',
          }}
        >
          <Typography 
            variant="h2" 
            gutterBottom
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(45deg, #FF1B1B 30%, #FF5C5C 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            Pokémon Explorer
          </Typography>
          
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ maxWidth: '80%', mx: 'auto', mb: 3 }}
          >
            Your ultimate guide to discover and learn about all Pokémon. Browse by name or type and collect information about your favorites!
          </Typography>
        </Paper>

        {/* Navigation Cards */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {cardData.map((card) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={card.href}
              component="div"
            >
              <Link href={card.href} passHref legacyBehavior>
                <Card
                  component="a"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: (theme) => `0 12px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
                    },
                  }}
                >
                  <CardActionArea sx={{ height: '100%' }}>
                    <CardContent sx={{ 
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}>
                      <Box 
                        sx={{ 
                          mb: 2,
                          p: 2,
                          borderRadius: '50%',
                          backgroundColor: alpha(card.color, 0.1),
                          color: card.color,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {card.icon}
                      </Box>
                      <Typography 
                        variant="h5" 
                        gutterBottom
                        sx={{ 
                          fontWeight: 'bold',
                          color: card.color,
                        }}
                      >
                        {card.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {card.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
        
        {/* Footer */}
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 4,
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Pokédex Explorer © {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </>
  );
}