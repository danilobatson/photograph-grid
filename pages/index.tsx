import React, { useReducer, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import axios from 'axios';
import {
  ImageSearch,
  PageInfo,
  ImageGallery,
  ImageUploadForm,
} from './components';

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
  open: boolean;
}

const initialState: State = {
  imageSrc: '',
  search: '',
  uploadData: '',
  images: [],
  name: '',
  open: false,
};

type ACTIONTYPE =
  | { type: 'SET_IMAGES'; payload: ImageType[] }
  | { type: 'SET_IMAGE_SRC'; payload: string }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_UPLOAD_DATA'; payload: string | undefined }
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_OPEN'; payload: boolean };

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
      case 'SET_OPEN':
        return { ...state, open: action.payload };
      default:
        return state;
    }
  };

  const handleOpen = () => dispatch({ type: 'SET_OPEN', payload: true });
  const handleClose = () => dispatch({ type: 'SET_OPEN', payload: false });

  const [state, dispatch] = useReducer(reducer, initialState);

  const { search, name, images, uploadData, imageSrc, open } = state;

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

    if (size && size > 800000) {
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
    dispatch({ type: 'SET_OPEN', payload: false });

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
        <Toolbar sx={{ flexWrap: 'wrap', mt: 1 }}>
          <ImageSearch search={search} updateSearch={updateSearch} />

          <nav></nav>
          <div>
            <ImageUploadForm
              name={name}
              uploadData={uploadData}
              imageSrc={imageSrc}
              handleOnChange={handleOnChange}
              changeName={changeName}
              submitImage={submitImage}
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
            />
          </div>
        </Toolbar>
      </AppBar>
      <PageInfo />
      <Container maxWidth='md' component='main'>
        <Typography
          variant='h5'
          align='left'
          color='white'
          sx={{ pb: 2 }}
          component='p'
        >
          {images && images.length} images
        </Typography>
      </Container>
      <Container maxWidth='md' component='main'>
        <Grid container spacing={5} alignItems='flex-end'>
          {images &&
            images.map((image) => (
              <ImageGallery key={image.newId} image={image} />
            ))}
        </Grid>
      </Container>
    </>
  );
}
