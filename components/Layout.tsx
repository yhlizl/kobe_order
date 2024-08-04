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

      <footer className="bg-[rgba(139,69,19,0.8)] text-[#fff8e1] text-center p-4 mt-12">
          <p>&copy; 2023 KOBE Pann 口碑烘焙坊 版權所有</p>
          <p className="mt-2">
            地址：新竹市東區建中一路35號 | 電話：03-5719898
          </p>
      </footer>
    </div>
  );
};

export default Layout;
