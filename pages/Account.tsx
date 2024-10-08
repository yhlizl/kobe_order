// pages/Account.tsx
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useUserStore } from '../store/user';
import { getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import { signIn } from 'next-auth/react';
import NextAuthOptions from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

import './Account.css';

// export async function getServerSideProps(context:any) {
//   const { req, res } = context;
//   const session : any = await getServerSession(req, res, NextAuthOptions);
//   console.log("test session",session)
//   // console.log("admin session",session)
//   if (!session || !session.user ) {
//     return { props: {nexLink: "/Login"} };
//   }

//   return { props: {nexLink : ""} };
// }

const AccountPage: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const router = useRouter();
  const { user, updateSession } = useUserStore();
  // const [ stateUser,setStateUser ] = useState(user);
  const [activeTab, setActiveTab] = useState('profile');
  useEffect(() => {
    if (!user || user?.email === '' || user?.email === 'admin@kobe.pann') {
      router.push('/Login');
    }
  }, []);

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


  const handleOrderFormSubmit = (orderId: any,banknumber: any) => {
    console.log('handleOrderFormSubmit', orderId,banknumber);
    fetch(`/api/editOrder`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: orderId,banknumber: banknumber}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('handleOrderFormSubmit data', data);
        setOrders(
          orders.map((order) =>
            order.orderid === orderId ? { ...order, banknumber: banknumber } : order,
          ),
        );
        alert("修改成功!");
      });
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    // console.log("tabId",tabId)
  };

  const fetchOrders = async () => {
    if (
      !user?.email ||
      user?.email === '' ||
      user?.email === 'admin@kobe.pann'
    ) {
      return;
    }
    const response = await fetch('/api/getOrders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail: user?.email,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    const data = await response.json();
    console.log('data.order', data.order);
    setOrders(data.order);
    return data.order;
  };

  useEffect(() => {
    // console.log("user", user);
    setFormValues({
      name: user?.name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      address: user?.address ?? '',
      password: '',
    });
    fetchOrders();
  }, [user]);

  const [formValues, setFormValues] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    address: user?.address ?? '',
    password: '',
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
        <div className="container" style={{ maxWidth: '1200px' }}>
          <h2>會員中心</h2>

          <div className="member-dashboard">
            <div className="sidebar animated">
              <ul>
                <li>
                  <a
                    href="#profile"
                    data-tab="profile"
                    className={activeTab === 'profile' ? 'active' : ''}
                    onClick={() => handleTabClick('profile')}
                  >
                    個人資料
                  </a>
                </li>
                <li>
                  <a
                    href="#orders"
                    data-tab="orders"
                    className={activeTab === 'orders' ? 'active' : ''}
                    onClick={() => handleTabClick('orders')}
                  >
                    訂單紀錄
                  </a>
                </li>
              </ul>
            </div>

            <div className="content animated">
              <div
                id="profile"
                className={
                  activeTab === 'profile' ? 'tab-content active' : 'tab-content'
                }
              >
                <h3>個人資料</h3>
                <form id="profile-form">
                  <div className="form-group">
                    <label htmlFor="name">姓名：</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formValues.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">電子郵件 (不可更改)：</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      defaultValue={formValues.email}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">電話：</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formValues.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">地址：</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formValues.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">更改密碼：</label>
                    <input
                      type="text"
                      id="password"
                      name="password"
                      value={formValues.password}
                      onChange={handleInputChange}
                      placeholder="請輸入新密碼，或留空以保留原密碼"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn"
                    onClick={handleProfileFormSubmit}
                  >
                    儲存變更
                  </button>
                </form>
              </div>

              <div
                id="orders"
                className={
                  activeTab === 'orders' ? 'tab-content active' : 'tab-content'
                }
              >
                <h3>訂單紀錄</h3>
                <table>
                  <thead>
                    <tr>
                      <th>訂單編號</th>
                      <th>日期</th>
                      <th>預計取貨日期</th>
                      <th>產品名稱</th>
                      <th>數量</th>
                      <th>圖片</th>
                      <th>金額</th>
                      <th>狀態</th>
                      <th>帳戶後四碼</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order,index) => (
                      <tr key={order.orderid}>
                        <td>#{order.orderid}</td>
                        <td>
                          {new Date(order.date).toLocaleString('en-US', {
                            timeZone: 'Asia/Taipei',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                          })}
                        </td>
                        <td>
                          {new Date(order.pickupdate).toLocaleDateString(
                            'en-US',
                            {
                              timeZone: 'Asia/Taipei',
                            },
                          )}
                        </td>
                        <td>{order.productname}</td>
                        <td>{order.quantity}</td>
                        <td>
                          <img
                            src={order.imageurl}
                            alt={order.productname}
                            style={{ width: '50px', height: '50px' }}
                          />
                        </td>
                        <td>NT$ {order.total}</td>
                        <td>{order.status}</td>
                        <td>
                        { ['待轉帳中','待確認匯款'].includes(order.status)  && (
                        <div>
                          <label htmlFor="bankNumber">
                            匯款帳號後四碼
                            <input
                              type="text"
                              id="banknumber"
                              name="banknumber"
                              defaultValue={order.banknumber}
                              onChange={e => {
                                const newOrders = [...orders];
                                newOrders[index].banknumber = e.target.value;
                                setOrders(newOrders);
                              }}
                              placeholder="請輸入匯款帳號後四碼"
                            />
                          </label>
                        
                        <button
                          className="btn"
                          onClick={()=>handleOrderFormSubmit(order.orderid,orders[index].banknumber)}
                        >
                          儲存變更
                        </button>
                        </div>
                          )}
                        </td>
                      </tr>
                    ))}
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
