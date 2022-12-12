import React, { useReducer, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Image from 'next/image';

import {
  ImageSearch,
  Description,
  ImageGrid,
  ImageUpload,
  ImageUpload2,
  InputUpload,
} from './components/';

export type ImageType = {
  newId: number;
  imageSrc: string;
  photoName: string;
};

interface State {
  imageSrc: string;
  search: string;
  uploadData: string | undefined;
  images?: ImageType[];
  name: string;
}

const initialState: State = {
  imageSrc: '',
  search: '',
  uploadData: '',
  images: [],
  name: '',
};

type ACTIONTYPE =
  | { type: 'SET_IMAGES'; payload: ImageType[] }
  | { type: 'SET_IMAGE_SRC'; payload: string }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_UPLOAD_DATA'; payload: string | undefined }
  | { type: 'SET_NAME'; payload: string };

export default function Pricing() {
  const reducer = (state: State, action: ACTIONTYPE) => {
    switch (action.type) {
      case 'SET_IMAGES':
        return { ...state, images: action.payload };
      case 'SET_IMAGE_SRC':
        return { ...state, imageSrc: action.payload };
      case 'SET_SEARCH':
        return { ...state, search: action.payload };
      case 'SET_UPLOAD_DATA':
        return { ...state, uploadData: action.payload };
      case 'SET_NAME':
        return { ...state, name: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { search, name, images, uploadData, imageSrc } = state;

  const updateSearch = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    dispatch({ type: 'SET_SEARCH', payload: target.value });
  };

  const handleOnChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const reader = new FileReader();

    let size;
    let file;

    if (target.files) {
      file = target.files[0];
      size = target.files[0].size;
      reader.readAsDataURL(file);
    }

    if (size && size > 1000000) {
      alert('File too large');
      return;
    }

    reader.onload = function (onLoadEvent) {
      dispatch({
        type: 'SET_IMAGE_SRC',
        payload: onLoadEvent.target?.result as string,
      });
      dispatch({ type: 'SET_UPLOAD_DATA', payload: undefined });
    };
  };

  const changeName = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    dispatch({ type: 'SET_NAME', payload: target.value });
  };

  const submitImage = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const form = event.target;

    //@ts-ignore
    const nameInput: HTMLInputElement = Array.from(form.elements).find(
      //@ts-ignore
      ({ name }) => {
        return name === 'name';
      }
    );

    const photoName = nameInput.value;

    let newImage: ImageType = {
      newId: 1,
      imageSrc: imageSrc,
      photoName,
    };

    if (images) {
      newImage.newId = images.length + 1;
    }

    axios
      .post('/api/photos', { newImage })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    dispatch({
      type: 'SET_IMAGES',
      payload: [...(images as ImageType[]), newImage],
    });
    dispatch({
      type: 'SET_IMAGE_SRC',
      payload: '' as string,
    });
    dispatch({
      type: 'SET_NAME',
      payload: '' as string,
    });

    const { target } = event;
    if (target instanceof HTMLFormElement) {
      target.reset();
    }
  };

  useEffect(() => {
    const imagesSearch = (data: ImageType[]) => {
      console.log('search');
      const filter = data.filter((image) => {
        const searchTerm = search.toLowerCase();
        return image.photoName.toLowerCase().includes(searchTerm);
      });
      return filter;
    };

    axios.get<ImageType[]>('/api/photos').then((res) => {
      const data = imagesSearch(res.data);
      dispatch({ type: 'SET_IMAGES', payload: data });
    });
  }, [search, imageSrc]);

  return (
    <>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
      />
      <CssBaseline />
      <AppBar
        position='static'
        color='default'
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <ImageSearch search={search} updateSearch={updateSearch} />

          <nav></nav>
          <div>
            <form method='post' onSubmit={submitImage}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                  id='standard-basic'
                  label='Puppies'
                  variant='standard'
                  size='small'
                  type='search'
                  helperText='Insert a name for your photo'
                  multiline
                  name='name'
                  value={name}
                  onChange={changeName}
                  required
                />
              </div>
              <input
                id='file'
                type='file'
                name='file'
                accept='image/*'
                multiple
                onChange={handleOnChange}
                required
              />
              {imageSrc && !uploadData && (
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
                      <Image
                        src={imageSrc}
                        width={150}
                        height={150}
                        alt='Uploaded image'
                      />
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button type='submit' fullWidth variant='contained'>
                      Upload Image
                    </Button>
                  </CardActions>
                </Card>
              )}
            </form>
          </div>
        </Toolbar>
      </AppBar>
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
      <Typography
        variant='h5'
        align='left'
        color='text.secondary'
        component='p'
      >
        {images && images.length} images
      </Typography>
      <Container maxWidth='md' component='main'>
        <Grid container spacing={5} alignItems='flex-end'>
          {images &&
            images.map((image) => (
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
            ))}
        </Grid>
      </Container>
    </>
  );
}
