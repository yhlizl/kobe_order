// app/adminPlatform/page.tsx
import React,{useState} from "react";
import { getSession } from 'next-auth/react';
import DSideBar from "../../components/DSideBar";
import "./index.css";
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
        <p id="totalOrders">3</p>
      </div>
      <div className="dashboard-card">
        <h3>本月營收</h3>
        <p id="monthlyRevenue">NT$1100</p>
      </div>
      <div className="dashboard-card">
        <h3>活躍用戶</h3>
        <p id="activeUsers">3</p>
      </div>
      <div className="dashboard-card">
        <h3>庫存商品</h3>
        <p id="stockProducts">3</p>
      </div>
    </div>
    <canvas id="revenueChart" width={922} height={300} style={{ display: 'block', boxSizing: 'border-box', height: '150px', width: '461px' }}></canvas>
  
  
  </div>
  )
}


const Products: React.FC<SectionProps> = ({ active }) => {
  if (!active) return null;
  // Products content here...
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: '',
    quantity: '',
    estimatedProductionTime: ''
  });

  const handleInputChange = (event:any) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value
    });
  };

  const handleImageChange = (event:any) => {
    setProduct({
      ...product,
      imageUrl: URL.createObjectURL(event.target.files[0])
    });
    setPreview(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    // Call your API to add the product
    // After successful addition, close the modal and clear the form
    setShowModal(false);
    setProduct({
      name: '',
      price: '',
      description: '',
      imageUrl: '',
      quantity: '',
      estimatedProductionTime: ''
    });
  };
  console.log("is show modal",showModal)
  return (
    <div id="products" className="content-section" >
      {/* Products content */}
      <div id="products" className="content-section" >
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>新增商品</button>
      {showModal && (
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
        Image:
        <input type="file" name="imageUrl" onChange={handleImageChange} required />
      </label>
      {preview && <img src={preview} alt="Preview" className="modalDiagram-img" />}
      <label>
        Quantity:
        <input type="number" name="quantity" value={product.quantity} onChange={handleInputChange} required />
      </label>
      <label>
        Estimated Production Time:
        <input type="text" name="estimatedProductionTime" value={product.estimatedProductionTime} onChange={handleInputChange} required />
      </label>
      <div className="modalDiagram-buttons">
        <button type="button" onClick={()=>setShowModal(false)} className="modalDiagram-button">Cancel</button>
        <button type="submit" className="modalDiagram-button">Add Product</button>
      </div>
    </form>
  </div>
)}
      <table id="productsTable">
        <thead>
          <tr>
            <th>商品名稱</th>
            <th>價格</th>
            <th>數量</th>
            <th>建立時間</th>
            <th>操作</th>
          </tr>
        </thead>
      </table>
    </div>
    </div>
  );
};

const Users: React.FC<SectionProps> = ({ active }) => {
  if (!active) return null;
  // Users content here...
  return (
    <div id="users" className="content-section">
      {/* Users content */}
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
            <th>操作</th>
          </tr>
        </thead>
        <tbody><tr>
      <td>1</td>
      <td>張三</td>
      <td>zhangsan@example.com</td>
      <td>0912345678</td>
      <td>
        <button className="btn btn-warning" >編輯</button>
        <button className="btn btn-danger">刪除</button>
      </td>
    </tr><tr>
      <td>2</td>
      <td>李四</td>
      <td>lisi@example.com</td>
      <td>0923456789</td>
      <td>
        <button className="btn btn-warning" >編輯</button>
        <button className="btn btn-danger">刪除</button>
      </td>
    </tr><tr>
      <td>3</td>
      <td>王五</td>
      <td>wangwu@example.com</td>
      <td>0934567890</td>
      <td>
        <button className="btn btn-warning">編輯</button>
        <button className="btn btn-danger" >刪除</button>
      </td>
    </tr></tbody>
      </table>
    </div>
    </div>
  );
};

const Orders: React.FC<SectionProps> = ({ active }) => {
  if (!active) return null;
  // Orders content here...
  return (
    <div id="orders" className="content-section">
      {/* Orders content */}

    <div id="orders" className="content-section" >
      <div className="dashboard-header">
        <h2 className="dashboard-title">訂單管理</h2>
      </div>
      <table id="ordersTable">
        <thead>
          <tr>
            <th>訂單ID</th>
            <th>用戶ID</th>
            <th>日期</th>
            <th>總額</th>
            <th>狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody><tr>
      <td>1</td>
      <td>1</td>
      <td>2023-05-10</td>
      <td>NT$350</td>
      <td>已完成</td>
      <td>
        <button className="btn btn-primary" >查看</button>
        <button className="btn btn-success" >完成</button>
      </td>
    </tr><tr>
      <td>2</td>
      <td>2</td>
      <td>2023-05-11</td>
      <td>NT$480</td>
      <td>處理中</td>
      <td>
        <button className="btn btn-primary" >查看</button>
        <button className="btn btn-success">完成</button>
      </td>
    </tr><tr>
      <td>3</td>
      <td>3</td>
      <td>2023-05-12</td>
      <td>NT$270</td>
      <td>待付款</td>
      <td>
        <button className="btn btn-primary" >查看</button>
        <button className="btn btn-success" >完成</button>
      </td>
    </tr></tbody>
      </table>
    </div>
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
  const session = await getSession(context);
  console.log("admin session",session)
    if (!session || !session.user || session.user.role !== 'admin') {

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