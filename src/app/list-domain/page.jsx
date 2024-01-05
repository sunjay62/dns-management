'use client';

import React from 'react';
import styles from './domainlist.module.css';
import ListDomain from '@/components/ListDomain/ListDomain';

const page = () => {
  return (
    <div className={`p-6 flex flex-col justify-between `}>
      <div className={`${styles.containerSetting}`}>
        <h1 className="text-color-accent ">List Domain</h1>
        <hr className="text-color-secondary" />
        <ListDomain />
      </div>
    </div>
  );
};

export default page;
