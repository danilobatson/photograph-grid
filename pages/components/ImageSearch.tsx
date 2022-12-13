import React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface ImageSearchProps {
  search: string;
  updateSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageSearch: React.FC<ImageSearchProps> = ({ search, updateSearch }) => {
  return (
    <Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
      <TextField
        id='standard-basic'
        label='Search images...'
        variant='outlined'
        size='small'
        type='search'
        value={search}
        onChange={updateSearch}
        sx={{mt: 1}}
      />
    </Typography>
  );
};

export default ImageSearch;
