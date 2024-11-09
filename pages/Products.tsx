import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import { useStore, Product as cartProp } from '@/store/cart';
import { useRouter } from 'next/router';
import styles from './Products.module.css';
import Head from 'next/head';

interface Product {
  productid: number;
  name: string;
  price: number;
  description: string;
  imageurl: string;
  quantity: number;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { cart, addToCart } = useStore();
  const quantityRefs = useRef<{ [key: string]: HTMLInputElement }>({});
  const router = useRouter();
  useEffect(() => {
    fetch('/api/getProducts')
      .then((response) => response.json())
      .then((data: { products: Product[] }) => {
        console.log(data);
        setProducts(data.products);
      });
  }, []);

  const handleAddToCart = (product: Product) => {
    const quantity = Number(quantityRefs.current[product.productid]?.value);
    if (quantity === 0) {
      alert('請輸入數量');
      return;
    }
    if (quantity > product.quantity) {
      alert('超過可購買數量');
      return;
    }

    console.log(quantityRefs.current[product.productid]?.value);
    const cartItem: cartProp = {
      id: product.productid.toString(),
      name: product.name,
      title: product.name,
      description: product.description,
      price: product.price,
      image: product.imageurl,
      quantity: quantity,
    };
    console.log(cartItem);
    addToCart(cartItem);
  };

  const handleQuantityChange = (productId: number, increment: number) => {
    const currentQuantity = Number(quantityRefs.current[productId]?.value) || 0;
    const newQuantity = Math.max(0, currentQuantity + increment);
    const product = products?.find(p => p.productid === productId);
    if (product && newQuantity > product.quantity) {
      alert('超過可購買數量');
      return;
    }
    if (quantityRefs.current[productId]) {
      quantityRefs.current[productId].value = newQuantity.toString();
    }
  };

  const handleCheckout = () => {
    // Handle checkout logic here
    // handleAddToCart(product);
    router.push('/Cart');
  };
  return (
    <div>
       <Head>
        <title> KOBE Pann | 中秋禮盒預購網</title>
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
          content="KOBE Pann 口碑烘焙坊, 月餅, 新竹好吃麵包, 烘焙, KOBE Pann, 口碑烘焙坊, 新竹麵包店, 清大美食, 新竹美食, 蛋黃酥, 新竹蛋黃酥, 月餅, 新竹月餅, 經典蛋黃酥, 紅土鹹鴨蛋黃, 鳳凰酥, KOBE人氣雙層中秋禮盒, 芋頭金沙流心, "
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.isArray(products) &&
            products.map((product) => (
              <div
                key={product.productid}
                className="border rounded-lg overflow-hidden shadow-lg m-3 p-4"
              >
                <Head>
                  <script type="application/ld+json">
                    {JSON.stringify({
                      "@context": "https://schema.org/",
                      "@type": "Product",
                      "name": product.name,
                      "image": product.imageurl,
                      "description": product.description,
                      "sku": product.productid.toString(),
                      "offers": {
                        "@type": "Offer",
                        "priceCurrency": "TWD",
                        "price": product.price.toString(),
                        "availability": "https://schema.org/InStock"
                      }
                    })}
                  </script>
                </Head>
                <div className="relative">
                  <img
                    src={product.imageurl}
                    alt={product.name}
                    className={`w-full h-64 object-cover mb-4 ${product.quantity === 0 ? 'opacity-50' : ''}`}
                  />
                  {product.quantity === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-white text-2xl">
                      Sold Out
                    </div>
                  )}
                </div>
                <h2 className="font-bold text-xl mb-2">{product.name}</h2>
                <p className="text-gray-700 text-base">{product.description}</p>
                <p className="text-gray-700 text-base">
                  NT${Math.floor(product.price)}
                </p>
                <div className="flex justify-center items-center mt-2 mb-4">
                  <button
                    className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-1 px-3 rounded"
                    onClick={() => handleQuantityChange(product.productid, -1)}
                    disabled={product.quantity === 0}
                  >
                    -
                  </button>
                  <input
                    className="mx-2 border text-center w-20"
                    type="number"
                    min="0"
                    max={product.quantity}
                    defaultValue="0"
                    id={`quantity-${product.productid}`}
                    ref={(el) => {
                      if (el) quantityRefs.current[product.productid] = el;
                    }}
                    disabled={product.quantity === 0}
                  />
                  <button
                    className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-1 px-3 rounded"
                    onClick={() => handleQuantityChange(product.productid, 1)}
                    disabled={product.quantity === 0}
                  >
                    +
                  </button>
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.quantity === 0}
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            ))}
        </div>
        <button
          className="fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4 bg-green-500 hover:bg-green-700 text-white font-bold rounded"
          onClick={() => handleCheckout()}
        >
          前往結帳
        </button>
      </Layout>
    </div>
  );
};

export default ProductsPage;
