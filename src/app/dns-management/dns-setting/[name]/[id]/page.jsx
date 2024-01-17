'use client';

import React from 'react';
import styles from './dnssetting.module.css';
import DnsSetting from '@/components/DnsSettings/DnsSetting';
import { useRouter } from 'next/navigation';

const Page = ({ params: { name, id } }) => {
  const router = useRouter();

  const handleSettingClick = () => {
    router.push(`/dns-management`);
  };

  // Check if router.query is defined before destructuring

  return (
    <div className={`p-6 flex flex-col justify-between `}>
      <div className={`${styles.containerSetting}`}>
        <div className="flex items-center justify-between">
          <h1 className="text-color-accent">Managing {name}</h1>
          <button className="bg-color-accent pr-3 pl-3 pt-1 pb-1 text-color-primary rounded font-bold hover:bg-color-hovertwo transition-all" onClick={handleSettingClick}>
            Back
          </button>
        </div>
        <hr className="text-color-secondary" />
        <DnsSetting id={id} domainName={name} />
      </div>
    </div>
  );
};

export default Page;
