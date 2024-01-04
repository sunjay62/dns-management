import React from 'react';
import styles from './apikey.module.css';

const page = () => {
  return (
    <div className={`p-6 flex flex-col justify-between `}>
      <div className={`${styles.containerApikey} `}>
        <h1>INI HALAMAN API KEY</h1>
      </div>
    </div>
  );
};

export default page;
