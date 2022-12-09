import React from 'react';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import { ImageType } from '../../pages/index';

interface ImageGridProps {
  image: ImageType;
}
const ImageGrid: React.FC<ImageGridProps> = ({ image }) => {
  const { imageSrc, photoName } = image;
  return (
    <div className={styles.card}>
      <h5>{photoName}</h5>
      <Image src={imageSrc} width={200} height={200} alt='Uploaded image' />
    </div>
  );
};

export default ImageGrid;
