import React from 'react';

export default function Footer({ children }) {
  if (window.location.pathname === '/login') return null;
  return <footer className="app-footer">{children}</footer>;
}
