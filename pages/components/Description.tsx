import React from 'react';
import styles from '../styles/Home.module.css';

const Description: React.FC = () => {
  return (
    <div className={styles.description}>
      <p>
        Get started by uploading your images to <code>api/photos</code>
      </p>
      <em>Image size limited to 1MB</em>
    </div>
  );
};

export default Description;
