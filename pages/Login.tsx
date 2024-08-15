// pages/Login.tsx
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import './Login.css';
import { signIn } from 'next-auth/react';
import { useUserStore } from '../store/user'; // 更新为你的 userStore 的路径
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const LoginPage: React.FC = () => {
  const { updateSession } = useUserStore();
  const router = useRouter();
  useEffect(() => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    // Tab switching logic
    const handleTabClick = (e: Event) => {
      e.preventDefault();
      const tabId = (e.target as HTMLElement).getAttribute('data-tab');

      tabContents.forEach((tab) => tab.classList.remove('active'));
      if (tabId) {
        const tabElement = document.getElementById(tabId);
        if (tabElement) {
          tabElement.classList.add('active');
        }
      }
    };

    tabLinks.forEach((link) => {
      link.addEventListener('click', handleTabClick);
    });

    // Login form submission
    const handleLoginFormSubmit = async (e: Event) => {
      e.preventDefault();
      const emailInput = document.getElementById('login-email');
      const passwordInput = document.getElementById('login-password');
      if (emailInput && passwordInput) {
        const email = (emailInput as HTMLInputElement).value;
        const password = (passwordInput as HTMLInputElement).value;
        try {
          const result: any = await signIn('credentials', {
            email,
            password,
            redirect: false,
          });
          console.log(result)
          if (result.error === 'User not found') {
            alert('找不到使用者');
          }
          if (result.error === 'Invalid password') {
            alert('密碼錯誤');
          }
          if (result.error === null) {
            const session = await getSession();
            // console.log("session",session)
            if (session) {
              updateSession(session);
            }
            router.push('/Account');
          }
        } catch (error: any) {
          console.error('An error occurred during sign in:', error);
        }
      }
    };

    if (loginForm) {
      loginForm.addEventListener('submit', handleLoginFormSubmit);
    }

    // Register form submission
    const handleRegisterFormSubmit = async (e: Event) => {
      e.preventDefault();
      const usernameInput = document.getElementById('register-username');
      const emailInput = document.getElementById('register-email');
      const passwordInput = document.getElementById('register-password');
      const phoneInput = document.getElementById('register-phone');
      if (usernameInput && emailInput && passwordInput && phoneInput) {
        const username = (usernameInput as HTMLInputElement).value;
        const email = (emailInput as HTMLInputElement).value;
        const password = (passwordInput as HTMLInputElement).value;
        const phone = (phoneInput as HTMLInputElement).value;
        alert(
          `註冊請求已發送\n帳號: ${username}\n電子郵件: ${email}\n密碼: ${'*'.repeat(password.length)}\n手機號碼: ${phone}`,
        );
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
            phone,
          }),
        });

        if (response.ok) {
          alert('註冊成功');
          await signIn('credentials', { email, password, redirect: false });
          const session = await getSession();
          if (session) {
            updateSession(session);
          }
          router.push('/Account');
        } else {
          alert('註冊失敗');
        }
      }
    };

    if (registerForm) {
      registerForm.addEventListener('submit', handleRegisterFormSubmit);
    }

    // Forgot password form submission
    const handleForgotPasswordFormSubmit = (e: Event) => {
      e.preventDefault();
      const emailInput = document.getElementById('forgot-email');
      if (emailInput) {
        const email = (emailInput as HTMLInputElement).value;
        fetch('/api/resetPassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userEmail:email }),
        });
        alert(`重設密碼請求已發送\n電子郵件: ${email}\n請檢查您的信箱以獲取進一步指示。`);
        router.push('/');
      }else{
        alert('請輸入您的電子郵件地址');
      }
    };

    if (forgotPasswordForm) {
      forgotPasswordForm.addEventListener(
        'submit',
        handleForgotPasswordFormSubmit,
      );
    }

    // Cleanup function
    return () => {
      tabLinks.forEach((link) => {
        link.removeEventListener('click', handleTabClick);
      });
      if (loginForm) {
        loginForm.removeEventListener('submit', handleLoginFormSubmit);
      }
      if (registerForm) {
        registerForm.removeEventListener('submit', handleRegisterFormSubmit);
      }
      if (forgotPasswordForm) {
        forgotPasswordForm.removeEventListener(
          'submit',
          handleForgotPasswordFormSubmit,
        );
      }
    };
  }, []);

  return (
    <div>
      <Layout>
        <div className="container">
          <header>
            <h1>KOBE Pann 口碑烘焙坊</h1>
          </header>

          <div id="login" className="auth-form animated tab-content active">
            <h2>會員登入</h2>
            <form id="login-form">
              <div className="form-group">
                <label htmlFor="login-email">電子郵件</label>
                <input type="email" id="login-email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="login-password">密碼</label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  required
                />
              </div>
              <button type="submit" className="btn">
                登入
              </button>
            </form>
          </div>

          <div id="register" className="auth-form animated tab-content">
            <h2>會員註冊</h2>
            <form id="register-form">
              <div className="form-group">
                <label htmlFor="register-username">帳號</label>
                <input
                  type="text"
                  id="register-username"
                  name="username"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="register-email">電子郵件</label>
                <input type="email" id="register-email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="register-password">密碼</label>
                <input
                  type="password"
                  id="register-password"
                  name="password"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="register-phone">手機號碼</label>
                <input type="tel" id="register-phone" name="phone" required />
              </div>
              <button type="submit" className="btn">
                註冊
              </button>
            </form>
          </div>

          <div id="forgot-password" className="auth-form animated tab-content">
            <h2>忘記密碼</h2>
            <form id="forgot-password-form" >
              <div className="form-group">
                <label htmlFor="forgot-email">電子郵件</label>
                <input type="email" id="forgot-email" name="email" required />
              </div>
              <button type="submit" className="btn">重設密碼</button>
            </form>
          </div>

          <div className="auth-links">
            <a href="#login" className="tab-link" data-tab="login">
              登入
            </a>
            <a href="#register" className="tab-link" data-tab="register">
              註冊
            </a>
            <a href="#forgot-password" className="tab-link" data-tab="forgot-password">忘記密碼</a>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default LoginPage;
