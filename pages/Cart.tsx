// Cart.tsx
import React, { useEffect, useState } from 'react';
import { useStore } from '../store/cart'; // 路徑可能需要根據你的項目結構來調整
import Layout from '../components/Layout';
import Link from 'next/link';
import { useUserStore } from '@/store/user';
import Head from 'next/head';

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
    <div>
      <Head>
        <title> KOBE Pann | 中秋禮盒預購網 | 聯絡我們 | 購物車</title>
        <meta
          name="description"
          content={`今年蛋黃酥3.0
          更酥鬆的餅皮 及 綿密細緻的鹹鴨蛋
          快把ɞ新鮮紅土鹹鴨蛋ʚ的美味分享給家人朋朋
          ✧(  ु•⌄• )◞◟( •⌄• ू )✧
          `}
        />
        <meta
          name="keywords"
          content="KOBE Pann 口碑烘焙坊, 月餅, 新竹好吃麵包, 烘焙, KOBE Pann, 口碑烘焙坊, 新竹麵包店, 清大美食, 新竹美食, 蛋黃酥, 新竹蛋黃酥, 月餅, 新竹月餅, 經典蛋黃酥, 紅土鹹鴨蛋黃, 鳳凰酥, KOBE人氣雙層中秋禮盒, 芋頭金沙流心, 美女老闆"
        />
        <meta
          property="og:title"
          content="中秋禮盒預購網 | KOBE Pann 口碑烘焙坊"
        />
        <meta
          property="og:description"
          content={`今年蛋黃酥3.0
          更酥鬆的餅皮 及 綿密細緻的鹹鴨蛋
          快把ɞ新鮮紅土鹹鴨蛋ʚ的美味分享給家人朋朋
          ✧(  ु•⌄• )◞◟( •⌄• ू )✧
          `}
        />
        <meta
          property="og:image"
          content="/kobe/EC2AAE47-B8E4-488A-A6FA-D7177B0366E0.jpeg"
        />
        <meta property="og:url" content="https://kobe-order.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="/kobe/EC2AAE47-B8E4-488A-A6FA-D7177B0366E0.jpeg"
        />
        <meta
          name="google-site-verification"
          content="4Lcxsvnx5s3Dv813yhPTzCIr2I-2LsgQFmJqcPFZEQs"
        />
      </Head>
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
          購物車
        </h2>
        <div className="bg-white shadow-md rounded px-4 sm:px-8 pt-6 pb-8 mb-4">
          <div id="cart-content">
            {showLargeImage && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-2xl mx-auto">
                  <img
                    src={largeImageUrl}
                    alt="Large"
                    className="w-full h-auto"
                  />
                  <button
                    className="absolute top-0 right-0 m-2 text-2xl font-bold leading-none text-black hover:text-gray-500"
                    onClick={handleCloseLargeImage}
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
            <table className="table-auto w-full mb-6 text-center sm:text-left">
              <thead>
                <tr>
                  <th className="px-2 sm:px-4 py-2">商品</th>
                  <th className="sm:table-cell px-4 py-2">名稱</th>
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
                    <td className="sm:table-cell px-4 py-2">{item.name}</td>
                    <td className="px-2 sm:px-4 py-2">NT$ {item.price}</td>
                    <td className="px-2 sm:px-4 py-2 items-center justify-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs sm:text-base"
                        onClick={() => changeQuantity(item.id, -1)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        className="quantity-input mx-2 w-12 sm:w-auto text-xs sm:text-base"
                        onChange={(e) =>
                          changeQuantity(item.id, Number(e.target.value))
                        }
                      />
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs sm:text-base"
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
    </div>
  );
};

export default Cart;
