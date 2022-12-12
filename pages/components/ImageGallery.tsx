import React from 'react';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
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
  const { imageSrc, photoName } = image;
  return (
    <Grid item key={image.newId} xs={12} md={4}>
      <Card>
        <CardHeader
          title={image.photoName}
          subheaderTypographyProps={{
            align: 'center',
          }}
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[700],
          }}
        />
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'baseline',
              mb: 2,
            }}
          >
            <Image
              src={image.imageSrc}
              width={200}
              height={200}
              alt='Uploaded image'
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ImageGallery;
