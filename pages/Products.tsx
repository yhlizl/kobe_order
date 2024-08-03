import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { useStore,Product as cartProp } from "@/store/cart"
import { useRouter } from "next/router"
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

  const handleCheckout = (product: Product) => {
    // Handle checkout logic here
    handleAddToCart(product);
    router.push('/checkout');
  };

  return (
    <div>
      <Layout>
        <table>
          <thead>
            <tr>
              <th className="hide">編號</th>
              <th>名稱</th>
              <th>價格</th>
              <th>描述</th>
              <th>圖片</th>
              <th>數量</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products)&&products.map(product => (
              <tr key={product.productid}>
                 <td className="hide">{product.productid}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td><img src={product.imageurl} alt={product.name} className="product-image" /></td>
                <td>
                <input type="number" min="1" max={product.quantity} defaultValue="0" id={`quantity-${product.productid}`} className="quantity-input" ref={el => { if (el) quantityRefs.current[product.productid] = el; }} />
                </td>
                <td>
                <button className="cart-button" onClick={() => handleAddToCart(product)}>加入購物車</button>
                <button className="checkout-button" onClick={() => handleCheckout(product)}>結帳</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};

export default ProductsPage;