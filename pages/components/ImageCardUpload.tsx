import React from 'react';
import styles from '../../styles/Home.module.css';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

interface ImageUploadProps {
  imageSrc: string;
  name: string;
}
const ImageCardUpload: React.FC<ImageUploadProps> = ({ imageSrc, name }) => {
  return (
    <Card>
      <CardHeader
        title={name}
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
          }}
        >
          <Image src={imageSrc} width={150} height={150} alt='Uploaded image' />
        </Box>
      </CardContent>
      <CardActions>
        <Button type='submit' fullWidth variant='contained'>
          Upload Image
        </Button>
      </CardActions>
    </Card>
  );
};

export default ImageCardUpload;
