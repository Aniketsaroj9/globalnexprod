import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink selection:bg-seal selection:text-paper dark:bg-dark-bg dark:text-dark-type dark:selection:bg-red-500">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
