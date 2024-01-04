'use client';

import Link from 'next/link';
import React from 'react';
import { House, SignOut, Globe, WebhooksLogo, Key, DotOutline, CaretDown } from '@phosphor-icons/react';
import styles from './sidebar.module.css';
import Image from 'next/image';

const Sidebar = ({ isSidebarOpen }) => {
  const [activeLink, setActiveLink] = React.useState(null);
  const [isDomainSettingsOpen, setIsDomainSettingsOpen] = React.useState(false);
  const [caretRotation, setCaretRotation] = React.useState(0);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsDomainSettingsOpen(false); // Close dropdown when other links are clicked
  };

  const handleSubMenuClick = (link) => {
    setActiveLink(link);
    setIsDomainSettingsOpen(true); // Buka dropdown saat submenu diklik
  };

  const handleDomainSettingsClick = () => {
    const newRotation = isDomainSettingsOpen ? 0 : 180;
    console.log('newRotation:', newRotation);
    setIsDomainSettingsOpen(!isDomainSettingsOpen);
    setCaretRotation(newRotation);
  };

  return (
    <div className={`${styles.sidebar} bg-color-accent flex flex-col justify-between h-full ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
      <div className="flex flex-2 items-center justify-center">
        <Image src="/assets/logotachyon.png" alt="Logo" width={125} height={100} />
      </div>
      <div className="flex flex-col flex-1 pt-10 gap-2">
        <Link href="/home" className={`flex items-center gap-2 text-base border p-2 rounded-lg ${activeLink === '/home' ? 'bg-color-hovertwo' : ''} hover:bg-color-hovertwo transition-all`} onClick={() => handleLinkClick('/home')}>
          <House className="text-color-primary" size={24} /> <span>Home</span>
        </Link>
        <div className={`flex flex-col  text-base border rounded-lg cursor-pointer transition-transform `}>
          {/* Dropdown for Domain Settings */}
          <div className={`flex items-center gap-2 text-base p-2 rounded-lg cursor-pointer  hover:bg-color-hovertwo transition-all`} onClick={handleDomainSettingsClick}>
            <Globe className="text-color-primary" size={24} /> <span>Domain Settings</span>
            <CaretDown size={18} className={`ml-4 transform transition-all`} style={{ transform: `rotate(${caretRotation}deg)` }} />
          </div>
          <div className={`${styles.dropdown} overflow-hidden transition-all`} style={{ maxHeight: isDomainSettingsOpen ? '100px' : '0', opacity: isDomainSettingsOpen ? '1' : '0' }}>
            <Link
              href="/create-domain"
              className={`flex items-center gap-2 text-base p-2 rounded-lg ${activeLink === '/create-domain' ? 'bg-color-hovertwo' : ''} hover:bg-color-hovertwo transition-all`}
              onClick={() => handleSubMenuClick('/create-domain')}
            >
              <DotOutline size={24} />
              <span>Create Domain</span>
            </Link>
            <Link
              href="/list-domain"
              className={`flex items-center gap-2 text-base p-2 rounded-lg ${activeLink === '/list-domain' ? 'bg-color-hovertwo' : ''} hover:bg-color-hovertwo transition-all`}
              onClick={() => handleSubMenuClick('/list-domain')}
            >
              <DotOutline size={24} />
              <span>List Domain</span>
            </Link>
            {/* Add more submenu items here */}
          </div>
        </div>
        <Link
          href="/domain-record"
          className={`flex items-center gap-2 text-base border p-2 rounded-lg ${activeLink === '/domain-record' ? 'bg-color-hovertwo' : ''} hover:bg-color-hovertwo transition-all`}
          onClick={() => handleLinkClick('/domain-record')}
        >
          <WebhooksLogo className="text-color-primary" size={24} /> <span>Domain Records</span>
        </Link>
        <Link href="/api-key" className={`flex items-center gap-2 text-base border p-2 rounded-lg ${activeLink === '/api-key' ? 'bg-color-hovertwo' : ''} hover:bg-color-hovertwo transition-all`} onClick={() => handleLinkClick('/api-key')}>
          <Key className="text-color-primary" size={24} /> <span>Api Key</span>
        </Link>
      </div>
      <div className="flex flex-col flex-2">
        <Link href="/logout" className="flex items-center gap-2 text-base border p-2 rounded-lg hover:bg-color-danger transition-all">
          <SignOut size={24} />
          <span>Sign Out</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
