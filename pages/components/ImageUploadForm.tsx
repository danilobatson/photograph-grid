import React from 'react';
import styles from '../../styles/Home.module.css';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import { ImageCardUpload } from './';

interface ImageUploadFormProps {
  submitImage: (e: React.FormEvent<HTMLFormElement>) => void;
  changeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageSrc: string;
  uploadData: string | undefined;
  name: string;
}
const ImageUploadForm: React.FC<ImageUploadFormProps> = ({
  submitImage,
  changeName,
  handleOnChange,
  imageSrc,
  uploadData,
  name,
}) => {
  return (
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
        <ImageCardUpload imageSrc={imageSrc} name={name} />
      )}
    </form>
  );
};

export default ImageUploadForm;
