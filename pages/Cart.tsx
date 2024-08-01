// Cart.tsx
import React from 'react';
import { useStore } from '../store/cart'; // 路徑可能需要根據你的項目結構來調整
import Layout from "../components/Layout";
import styles from './Cart.module.css'; // 導入 CSS Module
import Link from 'next/link';
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  let nextLink = '/Checkout';
  if (!session|| !session.user || session.user.role !== 'user') {
    nextLink = '/Login';
  }

  return {
    props: {nextLink}, // will be passed to the page component as props
  };
};

const Cart: React.FC = (props:any) => {
  const { cart, removeFromCart, changeQuantity } = useStore();
  
  const total = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
  console.log("nextLink", props.nextLink)
  return (
    <>
    <Layout>
    <div className="styles.container">
      <h2>購物車</h2>
      <div className="styles.cartStyles">
        <div id="cart-content">
          <table>
            <thead>
              <tr>
                <th>商品</th>
                <th>名稱</th>
                <th>單價</th>
                <th>數量</th>
                <th>小計</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(cart).map(item => (
                <tr key={item.id}>
                  <td><img src={item.image} alt={item.name} className="product-image" /></td>
                  <td>{item.name}</td>
                  <td>NT$ {item.price}</td>
                  <td>
                    <button onClick={() => changeQuantity(item.id, -1)}>-</button>
                    <input type="number" value={item.quantity} min="1" className="quantity-input" onChange={e => changeQuantity(item.id, Number(e.target.value))} />
                    <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                  </td>
                  <td>NT$ {item.price * item.quantity}</td>
                  <td><button className="remove-btn" onClick={() => removeFromCart(item.id)}>移除</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total">總計: NT$ {total}</div>
          <Link href={props.nextLink} className="checkout-btn">
              前往結帳
          </Link>
        </div>
      </div>
    </div>
     </Layout>
     </>
  );
};

export default Cart;