import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const PageInfo: React.FC = () => {
  return (
    <Container
      disableGutters
      maxWidth='sm'
      component='main'
      sx={{ pt: 8, pb: 6 }}
    >
      <Typography
        component='h1'
        variant='h2'
        align='center'
        color='text.primary'
        gutterBottom
      >
        Image Uploader
      </Typography>
      <Typography
        variant='h5'
        align='center'
        color='text.secondary'
        component='p'
      >
        Get started by uploading your images to <code>api/photos</code>
        <br />
        <em>Image size limited to 1MB</em>
      </Typography>
    </Container>
  );
};

export default PageInfo;
