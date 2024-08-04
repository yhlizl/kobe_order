'use client';
import React from 'react';
import style from './DashboardHeader.module.css';

const Header: React.FC = () => {
  return (
    <header className={style.dHeader}>
      <h1>KOBE Pann 口碑烘焙坊 - 管理員儀表板</h1>
    </header>
  );
};

export default Header;
