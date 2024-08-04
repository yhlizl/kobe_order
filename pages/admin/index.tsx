'use client';
// pages/products.tsx
import React from 'react';
import Head from 'next/head';
import './index.css';
import { signIn } from 'next-auth/react';

const AdminPage: React.FC = () => {
  const validateLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string };
    };
    const username = target.username.value; // get username
    const password = target.password.value; // get password

    // console.log(`Username: ${username}`);
    // console.log(`Password: ${password}`);
    // You can add more login validation logic here
    await signIn('admin-credentials', {
      username,
      password,
      callbackUrl: '/adminPlatform',
    });
  };

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="/page.css" />
      </Head>
      <div className="login-container" id="loginContainer">
        <h1>管理員登入</h1>
        <form id="loginForm" onSubmit={validateLogin}>
          <div className="form-group">
            <label htmlFor="username">帳號</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">密碼</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="btn">
            登入
          </button>
        </form>
        <p id="errorMessage" className="error-message"></p>
      </div>
    </div>
  );
};

export default AdminPage;
