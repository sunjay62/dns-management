'use client';

import './globals.css';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className="bg-color-primary" suppressHydrationWarning={true}>
          <ToastContainer />
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
      </QueryClientProvider>
    </html>
  );
};

export default RootLayout;
