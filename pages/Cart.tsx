// Cart.tsx
import React, { useEffect, useState } from 'react';
import { useStore } from '../store/cart'; // 路徑可能需要根據你的項目結構來調整
import Layout from '../components/Layout';
import Link from 'next/link';
import { useUserStore } from '@/store/user';

const Cart: React.FC = () => {
  const [nextLink, setNextLink] = useState('/Login');
  const [showLargeImage, setShowLargeImage] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const { cart, removeFromCart, changeQuantity } = useStore();
  const { user } = useUserStore();

  useEffect(() => {
    if (!user) {
      setNextLink('/Login');
    } else {
      setNextLink('/Checkout');
    }
  }, [user]);
  const handleImageClick = (imageUrl: string) => {
    setLargeImageUrl(imageUrl);
    setShowLargeImage(true);
  };

  const handleCloseLargeImage = () => {
    setShowLargeImage(false);
  };

  const total = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  console.log('nextLink', nextLink);
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
          購物車
        </h2>
        <div className="bg-white shadow-md rounded px-4 sm:px-8 pt-6 pb-8 mb-4">
          <div id="cart-content">
            {showLargeImage && (
              <div className="relative">
                <img src={largeImageUrl} alt="Large" className="large-image" />
                <button className="close-btn" onClick={handleCloseLargeImage}>
                  X
                </button>
              </div>
            )}
            <table className="table-auto w-full mb-6 text-center sm:text-left">
              <thead>
                <tr>
                  <th className="px-2 sm:px-4 py-2">商品</th>
                  <th className="hidden sm:table-cell px-4 py-2">名稱</th>
                  <th className="px-2 sm:px-4 py-2">單價</th>
                  <th className="px-2 sm:px-4 py-2">數量</th>
                  <th className="px-2 sm:px-4 py-2">小計</th>
                  <th className="px-2 sm:px-4 py-2">操作</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(cart).map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-2 sm:px-4 py-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover"
                        onClick={() => handleImageClick(item.image)}
                      />
                    </td>
                    <td className="hidden sm:table-cell px-4 py-2">
                      {item.name}
                    </td>
                    <td className="px-2 sm:px-4 py-2">NT$ {item.price}</td>
                    <td className="px-2 sm:px-4 py-2 flex items-center justify-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => changeQuantity(item.id, -1)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        className="quantity-input mx-2"
                        onChange={(e) =>
                          changeQuantity(item.id, Number(e.target.value))
                        }
                      />
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => changeQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </td>
                    <td className="px-2 sm:px-4 py-2">
                      NT$ {item.price * item.quantity}
                    </td>
                    <td className="px-2 sm:px-4 py-2">
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        移除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total text-center sm:text-right">
              總計: NT$ {total}
            </div>
            <div className="text-center sm:text-right">
              <Link href={nextLink} className="checkout-btn">
                前往結帳
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
