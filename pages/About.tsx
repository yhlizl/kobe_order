// pages/products.tsx
import React,{useEffect} from "react";
import Layout from "../components/Layout";
import "./About.css";
const AboutPage: React.FC = () => {

  useEffect(() => {
    const images = [
      '/kobe/7D4DEE37-2ED1-4390-B53B-5E6D274A65A0.jpeg',
      '/kobe/332F6B9D-B77E-4FDE-89F2-B453E9B631EA.jpeg',
      '/kobe/2022-05-06.png',
      // Add more images as needed
    ];

    let currentImageIndex = 0;

    function changeBackground() {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      const heroElement = document.querySelector('.hero') as HTMLElement;
      if (heroElement) {
        heroElement.style.backgroundImage = `url('${images[currentImageIndex]}')`;
      }
    }

    // Change the background every 5 seconds
    const intervalId = setInterval(changeBackground, 5000);

    // Clean up function
    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
          <img src="/kobe/879F7042-B361-4EB0-B9C3-F127348A3A20.jpeg" alt="品質保證" />
          <h3>品質保證</h3>
          <p>嚴選頂級原料，堅持手工製作，每一口都是極致美味。</p>
        </div>
        <div className="card">
          <img src="/kobe/2024-04-12.jpg" alt="創新精神" />
          <h3>創新精神</h3>
          <p>傳統工藝結合現代技術，不斷推陳出新，滿足顧客多元化的需求。</p>
        </div>
        <div className="card">
          <img src="/kobe/EC2AAE47-B8E4-488A-A6FA-D7177B0366E0.jpeg" alt="優質服務" />
          <h3>明亮舒適</h3>
          <p>乾淨明亮的展示空間，提供舒適的選物環境，讓您在這裡能夠輕鬆愉快地選擇。</p>
        </div>
      </div>
    </section>
  </div>
      </Layout>
    </div>
  );
};

export default AboutPage;
