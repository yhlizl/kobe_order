import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { useStore,Product as cartProp } from "@/store/cart"
import { useRouter } from "next/router"
import styles from './Products.module.css'
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
      .then(response => response.json())
      .then((data: { products: Product[]}) => {
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

    console.log(quantityRefs.current[product.productid]?.value)
    const cartItem :cartProp = {
      id: product.productid.toString(),
      name: product.name,
      title: product.name,
      description: product.description,
      price: product.price,
      image: product.imageurl,
      quantity: quantity
    }
    console.log(cartItem);
    addToCart(cartItem);
  };

  const handleCheckout = () => {
    // Handle checkout logic here
    // handleAddToCart(product);
    router.push('/Cart');
  };
  return (
    <div>
      <Layout>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.isArray(products) && products.map(product => (
            <div key={product.productid} className="border rounded-lg overflow-hidden shadow-lg m-3">
              <img src={product.imageurl} alt={product.name} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h2 className="font-bold text-xl mb-2">{product.name}</h2>
                <p className="text-gray-700 text-base">{product.description}</p>
                <p className="text-gray-700 text-base">NT${Math.floor(product.price)}</p>
                <input type="number" min="1" max={product.quantity} defaultValue="0" id={`quantity-${product.productid}`} className="quantity-input mt-2 mb-4" ref={el => { if (el) quantityRefs.current[product.productid] = el; }} />
                <div className="flex justify-between">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleAddToCart(product)}>加入購物車</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4 bg-green-500 hover:bg-green-700 text-white font-bold rounded" onClick={() => handleCheckout()}>前往結帳</button>
      </Layout>
    </div>
  );
};

export default ProductsPage;