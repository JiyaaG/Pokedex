import React, { useState, FormEvent } from 'react';
import { Box, TextField, Button } from '@mui/material';

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
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', mb: 2 }}>
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ ml: 1 }}>
        {buttonText}
      </Button>
    </Box>
  );
}
