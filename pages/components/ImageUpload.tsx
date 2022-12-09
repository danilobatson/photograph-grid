import React from 'react';
import styles from '../styles/Home.module.css';
import Image from 'next/image';

interface ImageUploadProps {
  imageSrc: string;
  name: string;
}
const ImageUpload: React.FC<ImageUploadProps> = ({ imageSrc, name }) => {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p>
        <Image src={imageSrc} width={150} height={150} alt='Uploaded image' />
        <button>Upload Files</button>
      </p>
    </div>
  );
};

export default ImageUpload;
