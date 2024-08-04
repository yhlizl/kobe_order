// app/adminPlatform/page.tsx
import React,{useEffect, useState} from "react";
import { getSession } from 'next-auth/react';
import DSideBar from "../../components/DSideBar";
import "./index.css";
import NextAuthOptions from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

interface SectionProps {
  active: boolean;
}
const Dashboard: React.FC<SectionProps> = (props) => {
  if (!props.active) {
    return null;
  }
  return (
    <div id="dashboard" className="content-section" style={{ display: 'block' }}>
    <div className="dashboard-header">
      <h2 className="dashboard-title">儀表板</h2>
      <div className="dashboard-actions">
        <button className="btn btn-primary">刷新數據</button>
      </div>
    </div>
    <div className="dashboard-grid">
      <div className="dashboard-card">
        <h3>總訂單數</h3>
        {/* <p id="totalOrders">3</p> */}
      </div>
      <div className="dashboard-card">
        <h3>本月營收</h3>
        {/* <p id="monthlyRevenue">NT$1100</p> */}
      </div>
      <div className="dashboard-card">
        <h3>活躍用戶</h3>
        {/* <p id="activeUsers">3</p> */}
      </div>
      <div className="dashboard-card">
        <h3>庫存商品</h3>
        {/* <p id="stockProducts">3</p> */}
      </div>
    </div>
    <canvas id="revenueChart" width={922} height={300} style={{ display: 'block', boxSizing: 'border-box', height: '150px', width: '461px' }}></canvas>
  
  
  </div>
  )
}


const Products: React.FC<SectionProps> = ({ active }) => {
  // Products content here...
  const [showModal, setShowModal] = useState<"new" | "close" | string>("close");
  const [preview, setPreview] = useState<string | null>(null);
  const [product, setProduct] = useState({
    productid: '',
    name: '',
    price: '',
    description: '',
    imageUrl: '',
    quantity: '',
    estimatedproductiontime: ''
  });
  const [allProducts, setAllProducts] = useState<Array<{
    productid: string;
    name: string;
    price: string;
    description: string;
    imageurl: string;
    quantity: string;
    estimatedproductiontime: string;
  }>>([]);
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    if (showModal !== "new" && showModal !== "close") {
      const productToEdit = allProducts.find(product => product.productid === showModal);
      if (productToEdit) {
        setProduct({
          productid: productToEdit.productid,
          name: productToEdit.name,
          price: productToEdit.price,
          description: productToEdit.description,
          imageUrl: productToEdit.imageurl,
          quantity: productToEdit.quantity,
          estimatedproductiontime:productToEdit.estimatedproductiontime,
        });
      }
    }
  }, [showModal]);
  if (!active) return null;
  const handleInputChange = (event:any) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value
    });
  };
  async function getProducts() {
    try {
      const response = await fetch('/api/getProducts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const products = await response.json();
      setAllProducts(products.products);
      // console.log("products:",products.products)
      return products;
    } catch (error) {
      // console.error('Failed to fetch products:', error);
      return [];
    }
  }
  const handleImageChange = (event:any) => {
    setProduct({
      ...product,
      imageUrl: URL.createObjectURL(event.target.files[0])
    });
    setPreview(URL.createObjectURL(event.target.files[0]));
  };

  const handleDelete = (productid : any) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      fetch(`/api/product/${productid}`, { method: 'DELETE' })
        .then(() => {
          setAllProducts(allProducts.filter(product => product.productid !== productid));
        })
        .catch((error) => {
          console.error('Failed to delete product:', error);
        });
    }
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
  
    // Call your API to add or update the product
    const response = await fetch(showModal === "new" ? 'api/addProduct' : `api/product/${product.productid}`, {
      method: showModal === "new" ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
  
    if (response.ok) {
      // After successful addition or update, close the modal and clear the form
      setShowModal("close");
      setProduct({
        productid: '',
        name: '',
        price: '',
        description: '',
        imageUrl: '',
        quantity: '',
        estimatedproductiontime: ''
      });
      // Refresh the products list
      getProducts();
    } else {
      console.error('Failed to add or update product');
    }
  };
  // console.log("is show modal",showModal)
  return (
    <div id="products" className="content-section" >
      {/* Products content */}
      <div id="products" className="content-section" >
      <button className="btn btn-primary" onClick={() => setShowModal("new")}>新增商品</button>
      {showModal !== "close" && (
  <div className="modalDiagram">
    <form onSubmit={handleSubmit} className="modalDiagram-form">
      <label>
        Name:
        <input type="text" name="name" value={product.name} onChange={handleInputChange} required />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={product.price} onChange={handleInputChange} required />
      </label>
      <label>
        Description:
        <textarea name="description" value={product.description} onChange={handleInputChange} required />
      </label>
      <label>
        Image URL:
        <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleInputChange} required />
      </label>
      {product.imageUrl && <img src={product.imageUrl} alt="Preview" className="modalDiagram-img" />}
      <label>
        Quantity:
        <input type="number" name="quantity" value={product.quantity} onChange={handleInputChange} required />
      </label>
      <label>
        Estimated Production Time:
        <input type="text" name="estimatedproductiontime" value={product.estimatedproductiontime} onChange={handleInputChange} required />
      </label>
      <div className="modalDiagram-buttons">
        <button type="button" onClick={()=>setShowModal("close")} className="modalDiagram-button">Cancel</button>
        <button type="submit" className="modalDiagram-button">Add Product</button>
      </div>
    </form>
  </div>
)}
      <table id="productsTable">
        <thead>
          <tr>
            <th>商品ID</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th>商品介紹</th>
            <th>圖片</th>
            <th>數量</th>
            <th>到貨時間</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(allProducts) && allProducts.map((product, index) => (
             <tr key={index}>
            <td>{product.productid}</td>
             <td>{product.name}</td>
             <td>{product.price}</td>
             <td>{product.description}</td>
             <td>
             <img src={product.imageurl} alt="Preview" className="modalDiagram-img" />
             </td>
             <td>{product.quantity}</td>
             <td>{product.estimatedproductiontime}</td>
             <td>
               <button className="btn btn-primary" onClick={() => setShowModal(product.productid)}>動作</button>
               <button className="btn btn-danger" onClick={() => handleDelete(product.productid)}>刪除</button>
             </td>
           </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};


const Users: React.FC<SectionProps> = ({ active }) => {
  const [users, setUsers] = useState([] as Array<any>);

  useEffect(() => {
    fetch('/api/user')
      .then(response => response.json())
      .then(data => {
        setUsers(data)
        // console.log("users",data)
      });
  }, []);

  const handleEdit = (userId: any) => {
    // Handle edit request here...
    alert(`Edit user with ID: ${userId}, not implemented yet`);
  };

  const handleDelete = (userId : any) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      fetch(`/api/user?id=${userId}`, { method: 'DELETE' })
        .then(() => {
          setUsers(users.filter(user => user.userid !== userId));
        });
    }
  };

  if (!active) return null;

  return (
    <div id="users" className="content-section">
      <div className="dashboard-header">
        <h2 className="dashboard-title">用戶管理</h2>
      </div>
      <table id="usersTable">
        <thead>
          <tr>
            <th>用戶ID</th>
            <th>姓名</th>
            <th>Email</th>
            <th>電話</th>
            <th>地址</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(users)) && users.map(user => (
            <tr key={user.userid}>
              <td>{user.userid}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleEdit(user.userid)}>編輯</button>
                <button className="btn btn-danger" onClick={() => handleDelete(user.userid)}>刪除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const Orders: React.FC<SectionProps> = ({ active }) => {
  const [orders, setOrders] = useState([] as Array<any>);
  const [selectedStatuses, setSelectedStatuses] = useState<{ [key: number]: string }>({});
  const [otherInputValues, setOtherInputValues] = useState<{ [key: number]: string }>({});
  const [startDate, setStartDate] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
  const [endDate, setEndDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
  const fetchOrders = async () => {
    const response = await fetch('/api/orders');
    const data = await response.json();
    setOrders(data);
    console.log("get orders data",data)
  }
  useEffect(() => {
    const fetchData = async () => {
      await fetchOrders();
    };
  
    fetchData();
  }, []);

  const handleStatusChange = (orderId:any) => {
    let newStatus = selectedStatuses[orderId];
    if (newStatus === '其他') {
      newStatus = otherInputValues[orderId];
    }
    if (!newStatus || newStatus === '') { 
      alert('Please select a status');
      return;
    }
    if (!newStatus || newStatus === '') { 
      alert('Please select a status');
      return;
    }
    fetch(`/api/orders?id=${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(response => response.json())
      .then(data => {
        setOrders(orders.map(order => order.orderid === orderId ? { ...order, status: newStatus } : order));
        // window.location.reload();
      });
  };

  if (!active) return null;

  return (
    <div id="orders" className="content-section">
      <div className="dashboard-header">
        <h2 className="dashboard-title">訂單管理</h2>
      </div>
      <div>
        <label>
          Start Date:
          <input type="date" value={startDate.toISOString().substr(0, 10)} onChange={e => setStartDate(new Date(e.target.value))} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate.toISOString().substr(0, 10)} onChange={e => setEndDate(new Date(e.target.value))} />
        </label>
      </div>
      <table id="ordersTable">
  <thead>
    <tr>
      <th>訂單ID</th>
      <th>商品ID</th>
      <th>商品名稱</th>
      <th>數量</th>
      <th>用戶ID</th>
      <th>用戶名稱</th>
      <th>用戶電子郵件</th>
      <th>用戶電話</th>
      <th>用戶地址</th>
      <th>日期</th>
      <th>總額</th>
      <th>狀態</th>
      <th>操作</th>
    </tr>
  </thead>
  <tbody>
  {orders.filter(order => {
            const orderDate = new Date(order.date);
            return orderDate >= startDate && orderDate <= endDate;
          }).map(order => {
      const selectedStatus = selectedStatuses[order.orderid] || order.status;
      return (
      <tr key={order.orderid}>
        <td>{order.orderid}</td>
        <td>{order.productid}</td>
        <td>{order.productname}</td>
        <td>{order.quantity}</td>
        <td>{order.userid}</td>
        <td>{order.username}</td>
        <td>{order.useremail}</td>
        <td>{order.userphone}</td>
        <td>{order.useraddress || 'N/A'}</td>
        <td>{new Date(order.date).toLocaleString('en-US', { timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })}</td>
        <td>{`NT${Math.round(order.total)}`}</td>
        <td>{order.status}</td>
        <td>
          <select value={selectedStatus} onChange={(e) => setSelectedStatuses({...selectedStatuses, [order.orderid]: e.target.value})}>
            <option value="">選擇...</option>
            <option value="完成">完成</option>
            <option value="取消">取消</option>
            <option value="確認已匯款">確認已匯款</option>
            <option value="可以到店取貨">可以到店取貨</option>
            <option value="其他">其他</option>
          </select>
          {selectedStatus === '其他' && <input type="text" value={otherInputValues[order.orderid] || ''} onChange={(e) => setOtherInputValues({...otherInputValues, [order.orderid]: e.target.value})} />}
          <button className="btn btn-primary" onClick={() => handleStatusChange(order.orderid)}>更新</button>
        </td>
      </tr>
    )}
    
    )}
  </tbody>
</table>
    </div>
  );
};

const Settings: React.FC<SectionProps> = ({ active }) => {
  if (!active) return null;
  // Settings content here...
  return (
    <div id="settings" className="content-section">
      {/* Settings content */}
      <div id="settings" className="content-section" >
      <h2 className="dashboard-title">系統設置</h2>
      <form id="settingsForm">
        <div className="form-group">
          <label htmlFor="siteName">網站名稱</label>
          <input type="text" id="siteName" name="siteName" value="KOBE Pann 口碑烘焙坊" />
        </div>
        <div className="form-group">
          <label htmlFor="contactEmail">聯繫郵箱</label>
          <input type="email" id="contactEmail" name="contactEmail" value="contact@kobepann.com" />
        </div>
        <div className="form-group">
          <label htmlFor="currency">貨幣單位</label>
          <select id="currency" name="currency">
            <option value="NT$">NT$</option>
            <option value="US$">US$</option>
            <option value="￥">￥</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">保存設置</button>
      </form>
    </div>
    </div>
  );
};

const AdminPlatformPage: React.FC = () => {
  const [active, setActive] = useState('dashboard');
  const handleClick = (target : string) => {
    setActive(target);
  };
  return (
    <>
      <DSideBar active={active} handleClick={handleClick} />
  <div className="container">
  <main className="main-content">
    <Dashboard active={active === "dashboard"}/>
    <Products active={active === "products"} />
    <Users active={active === "users"} />
    <Orders active={active === "orders"} />
    <Settings active={active === "settings"} />
  </main>
</div>
    </>
  )
};

export async function getServerSideProps(context:any) {
  const { req, res } = context;
  const session : any = await getServerSession(req, res, NextAuthOptions);
  console.log("test session",session)
  // console.log("admin session",session)
    if (!session || !session.user || session.user.name !== 'Admin' || session.user.email !== 'admin@kobe.pann') {

    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    }
  }
  return { props: {} };
}

export default AdminPlatformPage;