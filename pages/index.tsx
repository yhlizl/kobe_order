// pages/index.tsx
import React from 'react';
import '../styles/globals.css';
import Layout from '../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title> KOBE Pann | 中秋禮盒預購網</title>
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
          content="KOBE Pann 口碑烘焙坊, 月餅, 新竹好吃麵包, 烘焙, KOBE Pann, 口碑烘焙坊, 新竹麵包店, 清大美食, 新竹美食, 蛋黃酥, 新竹蛋黃酥, 月餅, 新竹月餅"
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
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "name": "KOBE Pann 口碑烘焙坊",
              "url": "https://kobe-order.vercel.app/",
              "logo": "https://kobe-order.vercel.app/kobe/EC2AAE47-B8E4-488A-A6FA-D7177B0366E0.jpeg",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "(03)571-9898",
                "contactType": "Customer service"
              }
            },
            {
              "@type": "WebSite",
              "url": "https://kobe-order.vercel.app/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://kobe-order.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          ]
        })}
      </script>
      </Head>
      <Layout>
      <main>

      <section className="relative rounded-lg p-8 text-center shadow-md lg:h-[500px]">
        <div className="absolute inset-0 bg-slide bg-cover bg-center-top-200 bg-no-repeat animate-slide"></div>
        <div className="relative">
          <h2 className="font-msjh font-bold text-3xl mb-4">中秋禮盒現正預購中</h2>
          <p className="font-msjh text-lg mb-4 text-shadow">
            {'今年蛋黃酥3.0'}
            <br />
            {'更酥鬆的餅皮 及 綿密細緻的鹹鴨蛋'}
            <br />
            {'快把ɞ新鮮紅土鹹鴨蛋ʚ的美味分享給家人朋朋'}
            <br />
            {'✧(  ु•⌄• )◞◟( •⌄• ू )✧'}
          </p>
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
            <Image
              src="/kobe/2021-07-12.jpg"
              alt="KOBE Pann 口碑烘焙坊 | 每日新鮮烘烤出爐"
              className="w-full h-48 object-cover rounded-lg"
              width={500}
              height={300}
            />
            <h3>每日新鮮烘烤出爐</h3>
            <p>堅持販售當日出爐的新鮮麵包</p>
          </div>
          <div className="bg-white rounded-lg p-6 w-full sm:w-1/2 md:w-1/3 text-center shadow-md transition-all duration-300 hover:-translate-y-2 my-4">
            <Image
              src="/kobe/2024-04-12 (1).jpg"
              alt="KOBE Pann 口碑烘焙坊 | 嚴選天然食材製作"
              className="w-full h-48 object-cover rounded-lg"
              width={500}
              height={300}
            />
            <h3>嚴選天然食材製作</h3>
            <p>選用天然發酵奶油與歐洲麵粉製作</p>
          </div>
          <div className="bg-white rounded-lg p-6 w-full sm:w-1/2 md:w-1/3 text-center shadow-md transition-all duration-300 hover:-translate-y-2 my-4">
            <Image
              src="/kobe/CC26D58E-3596-45BE-8B5B-9B1291D7AFC5.jpeg"
              alt="KOBE Pann 口碑烘焙坊 | 精緻包裝"
              className="w-full h-48 object-cover rounded-lg"
              width={500}
              height={300}
            />
            <h3>精緻包裝</h3>
            <p>典雅設計，送禮自用兩相宜</p>
          </div>
        </section>
        </main>
      </Layout>
    </>
  );
};

export default HomePage;
