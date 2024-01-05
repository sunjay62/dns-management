'use client';
import React, { useState } from 'react';
import styles from './navbar.module.css';
import { ArrowFatLinesLeft } from '@phosphor-icons/react';
import Link from 'next/link';

const Navbar = () => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <nav className={`${styles.navbar} flex md:flex-row flex-col justify-between md:items-center p-5 pl-2 gap-2 `}>
      {/* Left side - Toggle */}
      <div className="flex items-center text-color-dark">
        <button className="mr-4">
          <ArrowFatLinesLeft size={32} />
        </button>
      </div>

      {/* Right side - Profile Dropdown */}
      <div className="relative text-color-dark">
        <button onClick={toggleProfileMenu}>Profile</button>

        {/* Dropdown menu */}
        {isProfileMenuOpen && (
          <div className="absolute top-10 right-0 bg-color-dark p-4  shadow rounded-md">
            <div className="flex flex-col gap-1">
              <Link href="/profile" className="hover:bg-color-secondary p-4 pt-1 pb-1 rounded-lg transition-all">
                Profile
              </Link>
              <Link href="/setting" className="hover:bg-color-secondary p-4 pt-1 pb-1 rounded-lg transition-all">
                Setting
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
