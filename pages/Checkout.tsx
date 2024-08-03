// Checkout.tsx
import React,{useState,useEffect} from 'react';
import { useStore } from '../store/cart';
import {useUserStore} from "@/store/user"
import Layout from "../components/Layout";
import styles from './Checkout.module.css';
import { useRouter } from 'next/router';


  
const Checkout: React.FC = () => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [showModal, setShowModal] = useState(false);
const [paymentMethod, setPaymentMethod] = useState('');
const router = useRouter();
const { cart, removeFromCart } = useStore();
const { user}   = useUserStore();
useEffect(() => {
    if (!user) {
        router.push('/Login');
    }
  }, [user]);
  console.log("cart", cart) 
  console.log("user", user)
  const total = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setName(user?.name || '');
      setEmail(user?.email|| '');
      setPhone(user?.phone|| '');
    } else {
      setName('');
      setEmail('');
      setPhone('');
    }
  };
  const handleSubmit= async(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if (paymentMethod === 'bank-transfer') {
        setShowModal(true);
      }else{
        handleConfirm();
      }
  }
  const handleCancel = async () => {
    setShowModal(false);
  };
  const handleConfirm = async () => {
    // create order
    const isChecked = window.confirm('訂單是否送出');
    if (isChecked) {
        cart && Object.entries(cart).map(async ([_, item]) => {   
        await fetch('/api/submitOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userEmail: user?.email,
                total: total,
                status: paymentMethod,
                productId: item.id,
                quantity: item.quantity,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('data', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
        Object.keys(cart).forEach((id) => removeFromCart(id));
        router.push('/');
    }else{
        handleCancel()
    }
  };
  return (
    <>
    <Layout>
    <div className={styles.CheckoutBody}>
  <header>
    <h1>KOBE Pann 口碑烘焙坊</h1>
  </header>

  <div className={styles.container}>
    <h2>結帳</h2>
    <form id="checkout-form" className={styles["checkout-form"]} onSubmit={handleSubmit}>
      <div className="use-member-info">
        <input type="checkbox" id="use-member-info" name="use-member-info" onChange={handleCheck}/>
        <label htmlFor="use-member-info">使用會員資料</label>
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="name">姓名</label>
        <input type="text" id="name" name="name"  className={styles["name"]} value={name} onChange={e => setName(e.target.value)} required/>
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="email">電子郵件</label>
        <input type="email" id="email" name="email" className={styles["email"]} value={email} onChange={e => setEmail(e.target.value)} required/>
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="phone">電話</label>
        <input type="tel" id="phone" name="phone" className={styles["tel"]} value={phone} onChange={e => setPhone(e.target.value)} required/>
      </div>
      <div className={styles["form-group"]}>
        <label>付款方式</label>
        <div className={styles["payment-methods"]} >
          <div className="payment-method">
          <input type="radio" id="bank-transfer" name="payment" value="bank-transfer" onChange={e => setPaymentMethod(e.target.value)} required/>
            <label htmlFor="bank-transfer">
              <img src="/images/bank-transfer-icon.svg" alt="匯款" width="40" height="40"/>
              匯款
            </label>
          </div>
          <div className={styles["payment-methods"]}>
          <input type="radio" id="in-store" name="payment" value="in-store" onChange={e => setPaymentMethod(e.target.value)} required/>            <label htmlFor="in-store">
              <img src="/images/store-icon.svg" alt="到店付款" width="40" height="40"/>
              到店付款
            </label>
          </div>
        </div>
      </div>
      <button type="submit" className={styles["submit-btn"] }>完成訂購</button>
    </form>

    <div className={styles["order-summary"]} >
      <h3>訂單摘要</h3>
      <div id="order-items"></div>
  
      {cart && Object.entries(cart).map(([_, item]) => (
        <div key={item.name} className={styles["order-item"]}>
        <span>{item.name}</span>
          <img src={item.image} alt={item.name} width="40" height="40"/>
          <div className={styles["item-info"]}>
            <span>{item.quantity} x {item.price}</span>
          </div>
        </div>
      ))}   

      <div className={styles["order-total"]}>總計: <span id="order-total">{total}</span></div>
    </div>
  </div>

<div id="paymentModal" className={styles["modal"]}  style={{display: showModal ? 'block' : 'none'}}>
    <div className={styles["modal-content"]}>
      <span className={styles["close"]} onClick={handleCancel}>×</span>
      <h2 id="modalTitle" className={styles["modalTitle"]}>銀行匯款資訊</h2>
      <p id="modalContent" className={styles["modalContent"]}>

      {'訂單編號：ORD-240802-2437\n'}
        {'請將款項匯至以下帳戶：\n'}
        {'銀行：範例銀行\n'}
        {'帳號：1234-5678-9012-3456\n'}
        {'戶名：KOBE Pann 口碑烘焙坊\n'}
        {'金額：$0.00\n'}
        {'請在匯款後保留收據，並在取貨時出示。\n'}
        {'取貨地點：台北市中山區中山北路二段45號\n'}
        {'營業時間：\n'}
        {'週一至週五：10:00 - 20:00\n'}
        {'週六至週日：11:00 - 19:00'}
      </p>
    <div className={styles["modal-footer"]}>
      <button className={styles["confirm-btn"]} onClick={handleConfirm}>確認</button>
    </div>
    </div>
  </div>


</div>
     </Layout>
     </>
  );
};

export default Checkout;