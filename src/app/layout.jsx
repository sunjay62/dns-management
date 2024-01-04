import { Gabarito } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

const gabarito = Gabarito({ subsets: ['latin'] });

export const metadata = {
  title: 'DNS Management',
  description: 'Domain Name System Management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${gabarito.className} bg-color-primary`} suppressHydrationWarning={true}>
        <div className="main-container">
          <div className="sidebar-container">
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
}
