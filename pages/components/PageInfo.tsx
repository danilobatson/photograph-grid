import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const PageInfo: React.FC = () => {
  return (
    <Container disableGutters maxWidth='sm' component='main' sx={{ py: 4 }}>
      <Typography
        component='h1'
        variant='h2'
        align='center'
        color='white'
        gutterBottom
      >
        Image Uploader
      </Typography>
      <Typography
        sx={{ pb: 1, pt:2}}
        variant='h5'
        align='center'
        color='white'
        component='p'
      >
        Get started by uploading your images to <code>api/photos</code>
      </Typography>
      <Typography variant='h5' align='center' color='white' component='p'>
        <em>Image size limited to 8,000 KB</em>
      </Typography>
    </Container>
  );
};

export default PageInfo;
