import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Box,
  useTheme,
  alpha,
  Paper,
} from '@mui/material';
import Link from 'next/link';
import Head from 'next/head';
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

// Card data with icons
const cardData = [
  {
    title: 'Individual Lookup',
    description: 'Search for a specific Pokémon by name',
    icon: <SearchIcon sx={{ fontSize: 40 }} />,
    href: '/individual',
    color: '#EE8130',
  },
  {
    title: 'Multiple Lookup',
    description: 'Compare multiple Pokémon side by side',
    icon: <FormatListBulletedIcon sx={{ fontSize: 40 }} />,
    href: '/multiple',
    color: '#6390F0',
  },
  {
    title: 'Type Filter',
    description: 'Browse Pokémon by their type',
    icon: <FilterAltIcon sx={{ fontSize: 40 }} />,
    href: '/filter',
    color: '#7AC74C',
  },
];

export default function Home() {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>Pokédex - Home</title>
        <meta
          name="description"
          content="A comprehensive Pokédex application"
        />
      </Head>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Section */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            p: 4,
            mb: 6,
            background: `linear-gradient(45deg, ${alpha('#FF1B1B', 0.1)}, ${alpha('#FF1B1B', 0.05)})`,
            border: `1px solid ${alpha('#FF1B1B', 0.2)}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CatchingPokemonIcon 
              sx={{ 
                fontSize: 48, 
                mr: 2,
                color: '#FF1B1B',
              }} 
            />
            <Typography 
              variant="h3" 
              component="h1"
              sx={{ 
                fontWeight: 'bold',
                color: '#FF1B1B',
              }}
            >
              Pokédex
            </Typography>
          </Box>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600 }}>
            Welcome to your comprehensive Pokémon database. Search, compare, and discover Pokémon with our easy-to-use tools.
          </Typography>
        </Paper>

        {/* Feature Cards */}
        <Grid container spacing={4}>
          {cardData.map((card, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Link href={card.href} passHref style={{ textDecoration: 'none' }}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CardActionArea 
                    sx={{ 
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      p: 2,
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                      <Box 
                        sx={{ 
                          mb: 2,
                          display: 'flex',
                          justifyContent: 'center',
                          '& > *': { 
                            color: card.color,
                          }
                        }}
                      >
                        {card.icon}
                      </Box>
                      <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="h2"
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
      </Container>
    </>
  );
}