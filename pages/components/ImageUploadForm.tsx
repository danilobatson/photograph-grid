import React from 'react';

import TextField from '@mui/material/TextField';
import { ImageCardUpload } from './';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';

interface ImageUploadFormProps {
  submitImage: (e: React.FormEvent<HTMLFormElement>) => void;
  changeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageSrc: string;
  uploadData: string | undefined;
  name: string;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({
  submitImage,
  changeName,
  handleOnChange,
  imageSrc,
  uploadData,
  name,
  open,
  handleOpen,
  handleClose,
}) => {
  return (
    <>
      <Button variant='outlined' onClick={handleOpen}>
        Upload Image
      </Button>
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Box sx={style}>
            <form method='post' onSubmit={submitImage}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                  id='standard-basic'
                  label='Photo Name'
                  variant='standard'
                  size='small'
                  type='search'
                  helperText='Insert a name for your photo'
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
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ImageUploadForm;
