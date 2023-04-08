import React from 'react';
import Header from './Header';

interface Props {
    children: React.ReactNode;
  }

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;