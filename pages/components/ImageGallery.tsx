import React from 'react';
import Image from 'next/image';
import { ImageType } from '../index';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

interface ImageGridProps {
  image: ImageType;
}
const ImageGallery: React.FC<ImageGridProps> = ({ image }) => {
  const { imageSrc, photoName, newId } = image;
  return (
    <Grid item key={newId} xs={12} md={6}>
      <Card
        sx={{
          pb: 0,
        }}
      >
        <CardHeader
          title={photoName}
          titleTypographyProps={{
            align: 'center',
          }}
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[700],
            p: 1,
          }}
        />
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'baseline',
              m: 0,
            }}
          >
            <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
              <Image
                src={imageSrc}
                width={300}
                height={300}
                alt='Uploaded image'
              />
            </div>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ImageGallery;
