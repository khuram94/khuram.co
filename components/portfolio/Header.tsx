import React from 'react';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/portfolio/experience">Professional Experience</a></li>
          <li><a href="/portfolio/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;