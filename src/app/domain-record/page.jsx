import React from 'react';
import styles from './domainrecord.module.css';

const page = () => {
  return (
    <div className={`p-6 flex flex-col justify-between `}>
      <div className={`${styles.containerRecord}`}>
        <h1>INI HALAMAN DOMAIN RECORD</h1>
      </div>
    </div>
  );
};

export default page;
