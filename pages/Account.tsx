// pages/Account.tsx
import React, { useEffect,useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';
import { useUserStore } from '../store/user';
import { getSession } from "next-auth/react";
import Layout from "../components/Layout";
import { signIn } from 'next-auth/react';

import "./Account.css";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session|| !session.user || session.user.role !== 'user') {
    return {
      redirect: {
        destination: '/Login',
        permanent: false,
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
};

const AccountPage: React.FC = () => {
const router = useRouter();
const { user,updateSession } = useUserStore();
// const [ stateUser,setStateUser ] = useState(user);
const [activeTab, setActiveTab] = useState('profile');
const handleProfileFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch('/api/saveProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formValues.name,
        email: formValues.email,
        phone: formValues.phone,
        address: formValues.address,
        password: formValues.password,
      }),
    });

    if (!response.ok) {
      throw new Error('Profile update failed');
    }
    const data = await response.json();
    alert(data.message);

  } catch (error) {
    console.error('An error occurred:', error);
    alert('An error occurred while updating the profile');
  }
};

const handleTabClick = (tabId: string) => {
  setActiveTab(tabId);
  // console.log("tabId",tabId)
};


useEffect(() => {
  // console.log("user", user);
  setFormValues({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    address: user?.address ?? "",
    password:"",
  });
}, [user]);

const [formValues, setFormValues] = useState({
  name: user?.name ?? "",
  email: user?.email ?? "",
  phone: user?.phone ?? "",
  address: user?.address ?? "",
  password:"",
});
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormValues({
    ...formValues,
    [e.target.name]: e.target.value,
  });
};

  return (
    <div>
      <Layout>
      <div className="container" style={{maxWidth: '1200px'}}>
    <h2>會員中心</h2>
    
    <div className="member-dashboard">
      <div className="sidebar animated">
        <ul>
          <li><a href="#profile"  data-tab="profile" className={activeTab === 'profile' ? 'active' : ''} onClick={() => handleTabClick('profile')}>個人資料</a></li>
          <li><a href="#orders" data-tab="orders" className={activeTab === 'orders' ? 'active' : '' } onClick={() => handleTabClick('orders')}>訂單紀錄</a></li>

        </ul>
      </div>
      
      <div className="content animated">
        <div id="profile" className={activeTab === 'profile' ? 'tab-content active' : 'tab-content'}>
          <h3>個人資料</h3>
          <form id="profile-form">
            <div className="form-group">
              <label htmlFor="name">姓名：</label>
              <input type="text" id="name" name="name" value={formValues.name} onChange={handleInputChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="email">電子郵件 (不可更改)：</label>
              <input type="email" id="email" name="email"  defaultValue={formValues.email} readOnly/>
            </div>
            <div className="form-group">
              <label htmlFor="phone">電話：</label>
              <input type="tel" id="phone" name="phone" value={formValues.phone} onChange={handleInputChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="address">地址：</label>
              <input type="text" id="address" name="address" value={formValues.address} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">更改密碼：</label>
              <input type="text" id="password" name="password" value={formValues.password} onChange={handleInputChange} placeholder="請輸入新密碼，或留空以保留原密碼"/>
            </div>
            <button type="submit" className="btn" onClick={handleProfileFormSubmit}>儲存變更</button>
          </form>
        </div>
        
        <div id="orders"  className={activeTab === 'orders' ? 'tab-content active' : 'tab-content'}>
          <h3>訂單紀錄</h3>
          <table>
            <thead>
              <tr>
                <th>訂單編號</th>
                <th>日期</th>
                <th>金額</th>
                <th>狀態</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#12345</td>
                <td>2023-08-15</td>
                <td>NT$ 1,280</td>
                <td>已出貨</td>
                <td><a href="#" className="btn">查看詳情</a></td>
              </tr>
              <tr>
                <td>#12346</td>
                <td>2023-08-10</td>
                <td>NT$ 980</td>
                <td>已完成</td>
                <td><a href="#" className="btn">查看詳情</a></td>
              </tr>
              <tr>
                <td>#12347</td>
                <td>2023-08-05</td>
                <td>NT$ 2,100</td>
                <td>已完成</td>
                <td><a href="#" className="btn">查看詳情</a></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
      </Layout>
    </div>
  );
};

export default AccountPage;