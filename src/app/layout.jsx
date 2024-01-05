'use client';

import { Gabarito } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

const gabarito = Gabarito({ subsets: ['latin'] });

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${gabarito.className} bg-color-primary`} suppressHydrationWarning={true}>
        <div className="main-container">
          <div>
            <Sidebar />
          </div>
          <div className="content-container">
            <Navbar />
            <div className="scrollable-content">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
