// Checkout.tsx
import React, { useState, useEffect } from 'react';
import { useStore } from '../store/cart';
import { useUserStore } from '@/store/user';
import Layout from '../components/Layout';
import styles from './Checkout.module.css';
import { useRouter } from 'next/router';

const Checkout: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bankNumber, setBankNumber] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const router = useRouter();
  const { cart, removeFromCart } = useStore();
  const { user } = useUserStore();
  const [pickupDate, setPickupDate] = useState('');
  useEffect(() => {
    if (!user) {
      router.push('/Login');
    }
    setName(user?.name || '');
    setEmail(user?.email || '');
    setPhone(user?.phone || '');
    setPickupDate(getMinPickupDate());
  }, [user]);

  const total = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const getMinPickupDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toISOString().split('T')[0];
  };
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setName(user?.name || '');
      setEmail(user?.email || '');
      setPhone(user?.phone || '');
    } else {
      setName('');
      setEmail('');
      setPhone('');
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (paymentMethod === 'bank-transfer') {
      setShowModal(true);
    } else {
      handleConfirm();
    }
  };
  const handleCancel = async () => {
    setShowModal(false);
  };
  const handleConfirm = async () => {
    // create order
    const isChecked = window.confirm('訂單是否送出');
    if (isChecked) {
      cart &&
        Object.entries(cart).map(async ([_, item]) => {
          let status = paymentMethod;
          if (paymentMethod === 'bank-transfer') {
            status = '待轉帳中';
          } else if (paymentMethod === 'in-store') {
            status = '待取貨付款';
          }
          await fetch('/api/submitOrder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userEmail: user?.email,
              total: total,
              status: status,
              productId: item.id,
              quantity: item.quantity,
              pickupDate: pickupDate,
              banknumber: bankNumber,
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
      alert('訂單已送出, 請等待店家確認, 感謝您的訂購');
      router.push('/');
    } else {
      handleCancel();
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
            <form
              id="checkout-form"
              className={styles['checkout-form']}
              onSubmit={handleSubmit}
            >
              <div
                className="use-member-info"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <input
                  type="checkbox"
                  id="use-member-info"
                  name="use-member-info"
                  onChange={handleCheck}
                  checked={true}
                  disabled={true}
                />
                <label htmlFor="use-member-info">使用會員資料</label>
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="name">姓名</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={styles['name']}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={true}
                />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="email">電子郵件</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles['email']}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={true}
                />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="phone">電話</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={styles['tel']}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  disabled={true}
                />
              </div>
              <div className="flex flex-col space-y-4">
                <fieldset className="flex flex-col space-y-2">
                  <legend className="font-semibold text-lg">付款方式</legend>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="bank-transfer"
                        name="payment"
                        value="bank-transfer"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                        className="form-radio text-blue-600 h-5 w-5"
                      />
                      <span>匯款</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="in-store"
                        name="payment"
                        value="in-store"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                        className="form-radio text-blue-600 h-5 w-5"
                      />
                      <span>到店付款</span>
                    </label>
                  </div>
                </fieldset>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="pickupDate" className="font-semibold text-lg">
                    指定取貨日
                  </label>
                  <input
                    type="date"
                    id="pickupDate"
                    name="pickupDate"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={getMinPickupDate()}
                    required
                    className="form-input h-10"
                  />
                </div>
              </div>
              <button type="submit" className={styles['submit-btn']}>
                完成訂購
              </button>
            </form>

            <div className={styles['order-summary']}>
              <h3>訂單摘要</h3>
              <div id="order-items"></div>

              {cart &&
                Object.entries(cart).map(([_, item]) => (
                  <div key={item.name} className={styles['order-item']}>
                    <span>{item.name}</span>
                    <img
                      src={item.image}
                      alt={item.name}
                      width="40"
                      height="40"
                    />
                    <div className={styles['item-info']}>
                      <span>
                        {item.quantity} x {item.price}
                      </span>
                    </div>
                  </div>
                ))}

              <div className={styles['order-total']}>
                總計: <span id="order-total">{total}</span>
              </div>
            </div>
          </div>

          <div
            id="paymentModal"
            className={styles['modal']}
            style={{ display: showModal ? 'block' : 'none' }}
          >
            <div className={styles['modal-content']}>
              <span className={styles['close']} onClick={handleCancel}>
                ×
              </span>
              <h2 id="modalTitle" className={styles['modalTitle']}>
                銀行匯款資訊
              </h2>
              <p id="modalContent" className={styles['modalContent']}>
                {'請將款項匯至以下帳戶：\n'}
                {'銀行：中國信託（822）\n'}
                {'帳號：3365-4048-4504\n'}
                {'戶名：口碑烘焙坊\n'}
                {`金額：$${total}\n`}
                {'請在匯款後保留收據，並在取貨時出示。\n'}
                {'取貨地點：新竹市東區建中一路35號\n'}
                {'取貨時間：\n'}
                {`${pickupDate} 14:30 - 19:00`}
              </p>
              <div className={styles.inputContainer}>
              <label htmlFor="bankNumber">
                匯款帳號後四碼
                <input
                  type="text"
                  id="bankNumber"
                  name="bankNumber"
                  value={bankNumber}
                  onChange={e => setBankNumber(e.target.value)}
                  placeholder="請輸入匯款帳號後四碼(可以在會員中心訂單查詢中補上)"
                  className={styles.confirm}
                />
              </label>
            </div>
              <div className={styles['modal-footer']}>
                <button
                  className={styles['confirm-btn']}
                  onClick={handleConfirm}
                >
                  確認
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Checkout;
