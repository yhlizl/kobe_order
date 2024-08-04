// pages/products.tsx
import React from "react";
import Layout from "../components/Layout";
import 'font-awesome/css/font-awesome.min.css'
import "./Contact.css";

const ContactPage: React.FC = () => {
  return (
    <div>
      <Layout>
    <div className="container">
    <h2 >聯絡我們</h2>
    
    <div className="contact-info animated">
      <h3>聯絡方式</h3>
      <div className="contact-method">
        <i className="fa fa-phone"></i>
        <p>電話：(03) 571-9898</p>
      </div>
      <div className="contact-method">
        <i className="fa fa-envelope"></i>
        <p>電子郵件：kobepain2021@gmail.com</p>
      </div>
      <div className="contact-method">
        <i className="fa fa-map-marker"></i>
        <p>地址：新竹市東區建中一路35號</p>
      </div>
      <div className="contact-method">
        <i className="fa fa-clock-o"></i>
        <p>營業時間：週日至週四 11:30 - 19:30</p>
      </div>
    </div>
{/* 
    <div className="contact-form animated" style={{ animationDelay: '0.2s' }}>
      <h3>留言給我們</h3>
      <form id="contactForm" method="POST" action="/api/contact">
                <div className="form-group">
                    <label htmlFor="name">姓名</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">電子郵件</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="message">訊息</label>
                    <textarea id="message" name="message" required></textarea>
                </div>
                <button type="submit">送出</button>
            </form>
        </div>

    <div id="map" className="animated" style={{ animationDelay: '0.4s' }}></div> */}
  </div>
      </Layout>
    </div>
  );
};

export default ContactPage;
