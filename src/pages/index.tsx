import Head from 'next/head';
import Link from 'next/link';
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';

export default function Home() {
  return (
    <>
      <Head>
        <title>Pokédex Home</title>
        <meta
          name="description"
          content="Navigate to individual, multiple, or type-filtered lookup"
        />
      </Head>

      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Pokémon Explorer
        </Typography>

        <Grid container spacing={4}>
          {[
            {
              title: 'Individual Lookup',
              description: 'Search for a single Pokémon by name.',
              href: '/individual',
            },
            {
              title: 'Multiple Lookup',
              description: 'Search for multiple Pokémon (comma-separated).',
              href: '/multiple',
            },
            {
              title: 'Type Filter',
              description: 'Browse all Pokémon of a selected type.',
              href: '/filter',
            },
          ].map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.href}>
              <Link href={card.href} passHref legacyBehavior>
                <Card component="a" elevation={3} sx={{ textDecoration: 'none' }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        {card.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
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
