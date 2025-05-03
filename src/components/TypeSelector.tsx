import React from 'react';
import { Box, Button } from '@mui/material';

type Props = {
  options: string[];                  // e.g. ['grass','fire','water']
  selectedType: string | undefined;
  onSelect: (type: string | undefined) => void;
};

export function TypeSelector({ options, selectedType, onSelect }: Props) {
  return (
    <Box sx={{ display: 'flex', mb: 2 }}>
      {options.map((type) => (
        <Button
          key={type}
          variant={selectedType === type ? 'contained' : 'outlined'}
          onClick={() => onSelect(type)}
          sx={{ textTransform: 'capitalize', mr: 1 }}
        >
          {type}
        </Button>
      ))}
      <Button
        variant={selectedType == null ? 'contained' : 'text'}
        onClick={() => onSelect(undefined)}
        sx={{ textTransform: 'none' }}
      >
        Clear
      </Button>
    </Box>
  );
}
