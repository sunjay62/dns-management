'use client';

import React from 'react';
import styles from './domainlist.module.css';
import ListDomain from '@/components/DomainSettings/ListDomain/ListDomain';
import { PlusCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';

const page = () => {
  return (
    <div className={`p-6 flex flex-col justify-between `}>
      <div className={`${styles.containerSetting}`}>
        <div className="flex items-center justify-between">
          <h1 className="text-color-accent ">List Domain</h1>
          <Link href={'/create-domain'} className="flex gap-2 items-center pt-1 pb-1 pr-2 pl-2 bg-color-hovertwo text-color-primary hover:bg-color-accent rounded-md transition-all h-8">
            <PlusCircleOutlined />
            <span>Create</span>
          </Link>
        </div>
        <hr className="text-color-secondary" />
        <ListDomain />
      </div>
    </div>
  );
};

export default page;
