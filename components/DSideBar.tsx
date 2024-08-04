import React from 'react';
import style from './DSideBar.module.css';

interface SidebarProps {
  active: string;
  handleClick: (target: string) => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  return (
    <aside className={style.sidebar}>
      <div className={style.logo}>
        <h2>KOBE Pann</h2>
      </div>
      <ul className={style.menu}>
        <li
          className={`${style.menuItem} ${props.active === 'dashboard' ? style.menuItemActive : ''}`}
          onClick={() => props.handleClick('dashboard')}
          data-target="dashboard"
        >
          <i className="fas fa-tachometer-alt"></i> 儀表板
        </li>
        <li
          className={`${style.menuItem} ${props.active === 'products' ? style.menuItemActive : ''}`}
          onClick={() => props.handleClick('products')}
          data-target="products"
        >
          <i className="fas fa-box"></i> 商品管理
        </li>
        <li
          className={`${style.menuItem} ${props.active === 'users' ? style.menuItemActive : ''}`}
          onClick={() => props.handleClick('users')}
          data-target="users"
        >
          <i className="fas fa-users"></i> 用戶管理
        </li>
        <li
          className={`${style.menuItem} ${props.active === 'orders' ? style.menuItemActive : ''}`}
          onClick={() => props.handleClick('orders')}
          data-target="orders"
        >
          <i className="fas fa-shopping-cart"></i> 訂單管理
        </li>
        <li
          className={`${style.menuItem} ${props.active === 'settings' ? style.menuItemActive : ''}`}
          onClick={() => props.handleClick('settings')}
          data-target="settings"
        >
          <i className="fas fa-cog"></i> 系統設置
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
