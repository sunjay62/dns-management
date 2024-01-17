'use client';

import React from 'react';
import styles from './domainlist.module.css';
import ListDomain from '@/components/DomainRecords/ListDomain/ListDomain';
import { PlusCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';

const page = () => {
  return (
    <div className={`p-6 flex flex-col justify-between `}>
      <div className={`${styles.containerSetting}`}>
        <div className="flex items-center justify-between">
          <h1 className="text-color-accent ">DNS Management</h1>
        </div>
        <hr className="text-color-secondary" />
        <ListDomain />
      </div>
    </div>
  );
};

export default page;
