import React from 'react';
import styles from './home.module.css';

const page = () => {
  return (
    <div className={`p-6 flex flex-col justify-between `}>
      <div className={`${styles.containerHome}`}>
        <h1>INI HALAMAN HOME</h1>
      </div>
    </div>
  );
};

export default page;
