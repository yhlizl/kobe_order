// pages/index.tsx
import React from "react";
import "../styles/globals.css";
import Layout from "../components/Layout";
import Link from "next/link";
import Head from 'next/head';
const HomePage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>KOBE Pann 口碑烘焙坊</title>
        <meta name="description" content="KOBE Pann 口碑烘焙坊，用心烘焙每一口的幸福滋味" />
        <meta name="keywords" content="烘焙, KOBE Pann, 口碑烘焙坊, 精選食材, 匠心工藝, 精緻包裝" />
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
              alt="精選食材"
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3>精選食材</h3>
            <p>嚴選天然原料，無添加防腐劑</p>
          </div>
          <div className="bg-white rounded-lg p-6 w-full sm:w-1/2 md:w-1/3 text-center shadow-md transition-all duration-300 hover:-translate-y-2 my-4">
            <img
              src="/kobe/2024-04-12 (1).jpg"
              alt="匠心工藝"
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3>匠心工藝</h3>
            <p>傳承百年烘焙技藝，每一口都是藝術</p>
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
        <footer className="bg-[rgba(139,69,19,0.8)] text-[#fff8e1] text-center p-4 mt-12">
          <p>&copy; 2023 KOBE Pann 口碑烘焙坊 版權所有</p>
          <p className="mt-2">
            地址：新竹市東區建中一路35號 | 電話：03-5719898
          </p>
        </footer>
      </Layout>
    </div>
  );
};

export default HomePage;
