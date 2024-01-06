'use client';

import React from 'react';
import styles from './domaincreate.module.css';
import CreateDomain from '@/components/DomainSettings/CreateDomain/CreateDomain';

const page = () => {
  return (
    <div className={`p-6 flex flex-col justify-between `}>
      <div className={`${styles.containerSetting}`}>
        <h1 className="text-color-accent ">Create Domain</h1>
        <hr className="text-color-secondary" />
        <CreateDomain />
      </div>
    </div>
  );
};

export default page;
