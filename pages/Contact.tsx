// pages/products.tsx
import React from 'react';
import Layout from '../components/Layout';
import 'font-awesome/css/font-awesome.min.css';
import './Contact.css';
import Head from 'next/head';

const ContactPage: React.FC = () => {
  return (
    <div>
      <Head>
        <title> KOBE Pann | 中秋禮盒預購網 | 聯絡我們</title>
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
          content="KOBE Pann 口碑烘焙坊, 月餅, 新竹好吃麵包, 烘焙, KOBE Pann, 口碑烘焙坊, 新竹麵包店, 清大美食, 新竹美食, 蛋黃酥, 新竹蛋黃酥, 月餅, 新竹月餅, 經典蛋黃酥, 紅土鹹鴨蛋黃, 鳳凰酥, KOBE人氣雙層中秋禮盒, 芋頭金沙流心, 美女老闆, 新竹中秋禮盒"
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
        <div className="container">
          <h2>聯絡我們</h2>

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
