import React from 'react';
import styles from '../../styles/Home.module.css';
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
        variant='standard'
        size='small'
        type='search'
        helperText='Search images by name'
        multiline
        value={search}
        onChange={updateSearch}
      />
    </Typography>
  );
};

export default ImageSearch;
