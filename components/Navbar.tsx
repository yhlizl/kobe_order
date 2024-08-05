'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useUserStore } from '../store/user';
import { useStore } from '@/store/cart';
import { getSession } from 'next-auth/react';

const Navbar: React.FC = () => {
  const { user, updateSession } = useUserStore();
  const { cart } = useStore();
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session) {
        updateSession(session);
      }
    };

    fetchSession();
  }, []);

  return (
    <>
      <header className="bg-[#a6620d] text-[#fff8e1] text-center p-4 relative overflow-hidden">
        <h1 className="text-2xl sm:text-3xl md:text-5xl m-0 relative z-10 font-serif">
          KOBE Pann 口碑烘焙坊
        </h1>
      </header>
      <nav className="bg-[rgba(171,108,30,0.8)] p-2 sticky top-0 z-50">
        <ul className="list-none p-0 m-0 flex justify-center flex-wrap">
          <Link
            href="/"
            className="text-[#fff8e1] no-underline px-4 py-2 font-bold hover:bg-[rgba(255,255,255,0.2)] rounded"
          >
            首頁
          </Link>
          <Link
            href="/Products"
            className="text-[#fff8e1] no-underline px-4 py-2 font-bold hover:bg-[rgba(255,255,255,0.2)] rounded"
          >
            月餅禮盒
          </Link>
          <Link
            href="/About"
            className="text-[#fff8e1] no-underline px-4 py-2 font-bold hover:bg-[rgba(255,255,255,0.2)] rounded"
          >
            關於我們
          </Link>
          <Link
            href="/Contact"
            className="text-[#fff8e1] no-underline px-4 py-2 font-bold hover:bg-[rgba(255,255,255,0.2)] rounded"
          >
            聯絡我們
          </Link>
          <Link
            href="/Account"
            className="text-[#fff8e1] no-underline px-4 py-2 font-bold hover:bg-[rgba(255,255,255,0.2)] rounded"
          >
            會員中心
          </Link>
          <Link
            href="/Cart"
            className="text-[#fff8e1] no-underline px-4 py-2 font-bold hover:bg-[rgba(255,255,255,0.2)] rounded"
          >
            購物車({cart && Object.keys(cart).length})
          </Link>
          <li>
            {user && user.isLoggedIn && (
              <>
                <p>歡迎，{user.name}</p>{' '}
                <button
                  className="logout-btn"
                  onClick={() => useUserStore.getState().logOut()}
                >
                  登出
                </button>
              </>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
