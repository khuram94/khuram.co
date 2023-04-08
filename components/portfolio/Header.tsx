import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/portfolio/experience">Professional Experience</Link></li>
          <li><Link href="/portfolio/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;