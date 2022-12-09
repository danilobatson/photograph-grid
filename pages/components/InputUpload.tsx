import React from 'react';
import styles from '../styles/Home.module.css';

interface InputUploadProps {
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  changeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputUpload: React.FC<InputUploadProps> = ({
  handleOnChange,
  name,
  changeName,
}) => {
  return (
    <div className={styles.card}>
      <div >
        <label htmlFor='name'>Type In A Name For Your Photo: </label>
      </div>
      <input
        id='name'
        type='text'
        name='name'
        value={name}
        onChange={changeName}
        required
      />
      <input
        id='file'
        type='file'
        name='file'
        accept='image/*'
        multiple
        onChange={handleOnChange}
        required
      />
      <br />
    </div>
  );
};

export default InputUpload;
