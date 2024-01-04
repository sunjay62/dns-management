import React from 'react';
import styles from './domainlist.module.css';

const page = () => {
  return (
    <div className={`p-6 flex flex-col justify-between `}>
      <div className={`${styles.containerSetting}`}>
        <h1>INI HALAMAN LIST DOMAIN</h1>
      </div>
    </div>
  );
};

export default page;
