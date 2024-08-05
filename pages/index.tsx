// pages/index.tsx
import React from 'react';
import '../styles/globals.css';
import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
const HomePage: React.FC = () => {
  return (
    <div>
      <Head>
        <title> KOBE Pann | 中秋禮盒預購網</title>
        <meta
          name="description"
          content="KOBE Pann 口碑烘焙坊，用心烘焙每一口的幸福滋味。現在預購中秋禮盒，享受特別優惠！"
        />
        <meta
          name="keywords"
          content="KOBE Pann 口碑烘焙坊, 月餅, 新竹好吃麵包, 烘焙, KOBE Pann, 口碑烘焙坊, 新竹麵包店, 清大美食, 新竹美食, 蛋黃酥, 新竹蛋黃酥, 月餅, 新竹月餅"
        />
        <meta
          property="og:title"
          content="中秋禮盒預購網 | KOBE Pann 口碑烘焙坊"
        />
        <meta
          property="og:description"
          content="KOBE Pann 口碑烘焙坊，用心烘焙每一口的幸福滋味。現在預購中秋禮盒，享受特別優惠！"
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
        <section className="relative rounded-lg p-8 mt-8 text-center shadow-md lg:h-[500px]">
          <div className="absolute inset-0 bg-slide bg-cover bg-center-top-200 bg-no-repeat animate-slide"></div>
          <div className="relative">
            <h2>傳承手藝 匠心獨具</h2>
            <p>KOBE Pann 口碑烘焙坊，用心烘焙每一口的幸福滋味</p>
            <Link
              href="/Products"
              className="inline-block bg-[#8b4513] text-[#fff8e1] px-6 py-3 rounded-full no-underline font-bold hover:bg-[#a0522d] transition-all duration-300"
            >
              探索中秋月餅
            </Link>
          </div>
        </section>
        <section className="flex justify-around mt-12 flex-wrap">
          <div className="bg-white rounded-lg p-6 w-full sm:w-1/2 md:w-1/3 text-center shadow-md transition-all duration-300 hover:-translate-y-2 my-4">
            <img
              src="/kobe/2021-07-12.jpg"
              alt="每日新鮮烘烤出爐"
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3>每日新鮮烘烤出爐</h3>
            <p>堅持販售當日出爐的新鮮麵包</p>
          </div>
          <div className="bg-white rounded-lg p-6 w-full sm:w-1/2 md:w-1/3 text-center shadow-md transition-all duration-300 hover:-translate-y-2 my-4">
            <img
              src="/kobe/2024-04-12 (1).jpg"
              alt="嚴選天然食材製作"
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3>嚴選天然食材製作</h3>
            <p>選用天然發酵奶油與歐洲麵粉製作</p>
          </div>
          <div className="bg-white rounded-lg p-6 w-full sm:w-1/2 md:w-1/3 text-center shadow-md transition-all duration-300 hover:-translate-y-2 my-4">
            <img
              src="/kobe/CC26D58E-3596-45BE-8B5B-9B1291D7AFC5.jpeg"
              alt="精緻包裝"
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3>精緻包裝</h3>
            <p>典雅設計，送禮自用兩相宜</p>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default HomePage;
