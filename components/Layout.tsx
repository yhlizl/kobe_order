// components/Layout.tsx
import React from "react";
import Navbar from "./Navbar"; // 假設你的 Navbar 元件在 './Navbar.tsx'
import "../styles/globals.css";


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
