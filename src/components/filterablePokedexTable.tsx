import React, { useState } from 'react';
import {  Container, Paper, Typography } from '@mui/material';
import { api } from '../utils/trpc';
import PokedexTable from './PokedexTable'; 
import { TypeSelector } from './TypeSelector'; 
import { Pokemon } from './PokemonRow';

export default function FilterablePokedexTable() {
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
  
  // Use tRPC to fetch Pokémon data
  const { data: allPokemon, isLoading } = api.pokemon.getPokemonArray.useQuery([]);
  
  // Get all available types from the Pokémon data
  const availableTypes = React.useMemo(() => {
    if (!allPokemon) return [];
    
    // Extract all unique types from the Pokémon data
    const typesSet = new Set<string>();
    allPokemon.forEach((pokemon: Pokemon) => {
      pokemon.types.forEach((type: string) => {
        typesSet.add(type.toLowerCase());
      });
    });
    
    return Array.from(typesSet).sort();
  }, [allPokemon]);

  // Filter Pokémon based on selected type
  const filteredPokemon = React.useMemo(() => {
    if (!allPokemon) return [];
    
    if (!selectedType) return allPokemon;
    
    return allPokemon.filter((pokemon: Pokemon) => 
      pokemon.types.map((t: string) => t.toLowerCase()).includes(selectedType.toLowerCase())
    );
  }, [allPokemon, selectedType]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Pokédex
        </Typography>
        
        <TypeSelector 
          options={availableTypes}
          selectedType={selectedType}
          onSelect={setSelectedType}
        />
        
        <PokedexTable 
          pokemon={filteredPokemon}
          loading={isLoading}
        />
      </Paper>
    </Container>
  );
}