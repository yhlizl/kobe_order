// pages/products.tsx
import React from "react";
import Layout from "../components/Layout";
import "./About.css";
const AboutPage: React.FC = () => {
  return (
    <div>
        <Layout>

          <div className="hero">
            <div className="hero-content">
            <h2>精緻月餅禮盒，品質保證</h2>
            <p>用心烘焙，傳遞幸福滋味</p>
            </div>
        </div>
        <div className="container">
    <section className="section visible" id="about">
      <h2>KOBE PANN 創立故事</h2>
      <p>在繁忙的城市生活中，總有一個地方讓人想起家的溫暖，那就是KOBE PANN。這家麵包店的名字蘊含著深意，&quot;KOBE&quot;這個詞源自日文發音，與中文的&quot;口碑&quot;有相似之處，象徵著我們追求卓越品質和顧客的良好評價。&quot;PANN&quot;則是台語中&quot;麵包&quot;的諧音，簡單卻溫馨，讓人感受到家的味道。

KOBE PANN的創立源於一個樸素而真摯的夢想：將日式、台式和歐式麵包的精髓結合在一起，為每一位顧客帶來最純正的味覺享受。我們的創始人在一次日本旅行中，深深被當地麵包的香氣和口感所吸引，回到台灣後，他決心創立一家能夠融合世界各地麵包特色的麵包店。</p>
    </section>

    <section className="section visible" id="values">
      <h2>我們的核心價值</h2>
      <div className="grid">
        <div className="card">
          <img src="/images/quality.jpg" alt="品質保證" />
          <h3>品質保證</h3>
          <p>嚴選頂級原料，堅持手工製作，每一口都是極致美味。</p>
        </div>
        <div className="card">
          <img src="/images/innovation.jpg" alt="創新精神" />
          <h3>創新精神</h3>
          <p>傳統工藝結合現代技術，不斷推陳出新，滿足顧客多元化的需求。</p>
        </div>
        <div className="card">
          <img src="/images/service.jpg" alt="優質服務" />
          <h3>優質服務</h3>
          <p>以客為尊，提供貼心周到的服務，讓每位顧客賓至如歸。</p>
        </div>
      </div>
    </section>

    <section className="section" id="history">
      <h2>我們的歷史</h2>
      <div className="timeline">
        <div className="timeline-item left">
          <div className="timeline-content">
            <h3>2021年</h3>
            <p>KOBE Pann 口碑烘焙坊在新竹成立，開始製作精緻日式月餅禮盒。</p>
          </div>
        </div>
        <div className="timeline-item right">
          <div className="timeline-content">
            <h3>2022年</h3>
            <p>擴展業務到新竹，引入日本烘焙技術，開創台日融合新風味。</p>
          </div>
        </div>
        <div className="timeline-item left">
          <div className="timeline-content">
            <h3>2024年</h3>
            <p>推出創新月餅系列，融合台日風味，成為中秋節熱銷商品。</p>
          </div>
        </div>
        <div className="timeline-item right">
          <div className="timeline-content">
            <h3>2025年</h3>
            <p>即將全面升級生產設備與擴展業務到竹北，堅持傳統工藝與現代科技的完美結合。</p>
          </div>
        </div>
        <div className="timeline-item left">
          <div className="timeline-content">
            <h3>2025年</h3>
            <p>慶祝竹北店開慶，推出限量紀念版月餅禮盒，延續經典傳承。</p>
          </div>
        </div>
      </div>
    </section>
  </div>
      </Layout>
    </div>
  );
};

export default AboutPage;
