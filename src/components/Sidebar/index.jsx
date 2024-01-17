'use client';

import Link from 'next/link';
import React from 'react';
import { House, SignOut, Globe, WebhooksLogo, Key, DotOutline, CaretDown, ArrowFatLinesLeft } from '@phosphor-icons/react';
import styles from './sidebar.module.css';
import Image from 'next/image';
import useStore from '../Store';
import { motion, useAnimation } from 'framer-motion';

const Sidebar = () => {
  const [activeLink, setActiveLink] = React.useState(null);
  const [isDomainSettingsOpen, setIsDomainSettingsOpen] = React.useState(false);
  const [isDomainRecordsOpen, setIsDomainRecordsOpen] = React.useState(false);
  const { isSidebarOpen } = useStore();
  const controls = useAnimation();

  React.useEffect(() => {
    controls.start({ width: isSidebarOpen ? 250 : 75 });
  }, [isSidebarOpen]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsDomainSettingsOpen(false); // Close dropdown when other links are clicked
    setIsDomainRecordsOpen(false); // Close dropdown when other links are clicked
  };

  const handleSubMenuClick = (link) => {
    setActiveLink(link);
    setIsDomainSettingsOpen(true); // Buka dropdown saat submenu diklik
  };

  const handleSubMenuRecordClick = (link) => {
    setActiveLink(link);
    setIsDomainRecordsOpen(true); // Buka dropdown saat submenu diklik
  };

  const handleDomainSettingsClick = () => {
    setIsDomainSettingsOpen(!isDomainSettingsOpen);
    setIsDomainRecordsOpen(false);
  };

  const handleDomainRecordsClick = () => {
    setIsDomainRecordsOpen(!isDomainRecordsOpen);
    setIsDomainSettingsOpen(false);
  };

  return (
    <motion.div className={`${styles.sidebar} bg-color-accent flex flex-col justify-between h-full`} animate={controls}>
      <div className="flex flex-2 items-center justify-center">
        <Image src="/assets/logoremala.png" alt="Logo" width={125} height={100} />
      </div>
      <div className={`flex flex-col flex-1 pt-10 gap-2 `}>
        <Link
          href="/home"
          className={`flex items-center gap-2 text-base border p-${isSidebarOpen ? '2' : '1'} rounded-lg ${activeLink === '/home' ? 'bg-color-hovertwo' : ''} hover:bg-color-hovertwo transition-all`}
          onClick={() => handleLinkClick('/home')}
        >
          <House className="text-color-primary" size={24} /> <span className={`${isSidebarOpen ? '' : 'hidden'}`}>Home</span>
        </Link>
        <div className={`flex flex-col  text-base border rounded-lg cursor-pointer transition-transform `}>
          {/* Dropdown for Domain Settings */}
          <div className={`flex items-center gap-2 text-base p-${isSidebarOpen ? '2' : '1'} rounded-lg cursor-pointer  hover:bg-color-hovertwo transition-all `} onClick={handleDomainSettingsClick}>
            <Globe className="text-color-primary" size={24} /> <div className={`${isSidebarOpen ? '' : 'hidden'}`}>Domain Settings</div>
            <CaretDown size={18} className={`ml-4 transform transition-all ${isSidebarOpen ? '' : 'hidden'}`} />
          </div>
          <div className={`${styles.dropdown} overflow-hidden transition-all`} style={{ maxHeight: isDomainSettingsOpen ? '100px' : '0', opacity: isDomainSettingsOpen ? '1' : '0' }}>
            <Link
              href="/create-domain"
              className={`flex items-center gap-2 text-base p-2 rounded-lg ${activeLink === '/create-domain' ? 'bg-color-hovertwo' : ''} hover:bg-color-hovertwo transition-all`}
              onClick={() => handleSubMenuClick('/create-domain')}
            >
              <DotOutline size={24} />
              <span className={`${isSidebarOpen ? '' : 'hidden'}`}>Add Domain</span>
            </Link>
            <Link
              href="/list-domain"
              className={`flex items-center gap-2 text-base p-${isSidebarOpen ? '2' : '1'} rounded-lg ${activeLink === '/list-domain' ? 'bg-color-hovertwo' : ''} hover:bg-color-hovertwo transition-all`}
              onClick={() => handleSubMenuClick('/list-domain')}
            >
              <DotOutline size={24} />
              <span className={`${isSidebarOpen ? '' : 'hidden'}`}>List Domain</span>
            </Link>
            {/* Add more submenu items here */}
          </div>
        </div>
        {/* <div className={`flex flex-col  text-base border rounded-lg cursor-pointer transition-transform `}>
          <div className={`flex items-center gap-2 text-base p-${isSidebarOpen ? '2' : '1'} rounded-lg cursor-pointer  hover:bg-color-hovertwo transition-all`} onClick={handleDomainRecordsClick}>
            <WebhooksLogo className="text-color-primary" size={24} /> <span className={`${isSidebarOpen ? '' : 'hidden'}`}>Domain Records</span>
            <CaretDown size={18} className={`ml-4 transform transition-all ${isSidebarOpen ? '' : 'hidden'}`} />
          </div>
          <div className={`${styles.dropdown} overflow-hidden transition-all`} style={{ maxHeight: isDomainRecordsOpen ? '100px' : '0', opacity: isDomainRecordsOpen ? '1' : '0' }}>
            <Link
              href="/create-domain-record"
              className={`flex items-center gap-2 text-base p-${isSidebarOpen ? '2' : '1'} rounded-lg ${activeLink === '/create-domain-record' ? 'bg-color-hovertwo' : ''} hover:bg-color-hovertwo transition-all`}
              onClick={() => handleSubMenuRecordClick('/create-domain-record')}
            >
              <DotOutline size={24} />
              <span className={`${isSidebarOpen ? '' : 'hidden'}`}>Add Domain Record </span>
            </Link>
            <Link
              href="/list-domain-record"
              className={`flex items-center gap-2 text-base p-${isSidebarOpen ? '2' : '1'} rounded-lg ${activeLink === '/list-domain-record' ? 'bg-color-hovertwo' : ''} hover:bg-color-hovertwo transition-all`}
              onClick={() => handleSubMenuRecordClick('/list-domain-record')}
            >
              <DotOutline size={24} />
              <span className={`${isSidebarOpen ? '' : 'hidden'}`}>List Domain Record</span>
            </Link>
          </div>
        </div> */}
        <Link
          href="/dns-management"
          className={`flex items-center gap-2 text-base border p-${isSidebarOpen ? '2' : '1'} rounded-lg ${activeLink === '/dns-management' ? 'bg-color-hovertwo' : ''} hover:bg-color-hovertwo transition-all`}
          onClick={() => handleLinkClick('/dns-management')}
        >
          <WebhooksLogo className="text-color-primary" size={24} /> <span className={`${isSidebarOpen ? '' : 'hidden'}`}>DNS Management</span>
        </Link>
        <Link
          href="/api-key"
          className={`flex items-center gap-2 text-base border p-${isSidebarOpen ? '2' : '1'} rounded-lg ${activeLink === '/api-key' ? 'bg-color-hovertwo' : ''} hover:bg-color-hovertwo transition-all`}
          onClick={() => handleLinkClick('/api-key')}
        >
          <Key className="text-color-primary" size={24} /> <span className={`${isSidebarOpen ? '' : 'hidden'}`}>Api Key</span>
        </Link>
      </div>
      <div className="flex flex-col flex-2">
        <Link href="/logout" className={`flex items-center gap-2 text-base border p-${isSidebarOpen ? '2' : '1'} rounded-lg hover:bg-color-danger transition-all`}>
          <SignOut size={24} />
          <span className={`${isSidebarOpen ? '' : 'hidden'}`}>Sign Out</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default Sidebar;
