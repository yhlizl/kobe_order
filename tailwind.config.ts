import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit", // 啟用 JIT 模式
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'slide': "url('/kobe/2022-05-06.png')", // 新增的背景圖片
      },
      colors: {
        "custom-brown": "rgba(139,69,19,0.8)",
        "custom-red": "rgba(165,42,42,0.8)",
        "custom-beige": "rgba(255,250,240,0.9)",
        "custom-blue": "#0000ff", // 新增的自定義顏色
        'gradient-light': '#FDBA74',
        'gradient-dark': '#FF3D00',
      },
      keyframes: {
        gradient: {
          '0%': { 'background-size': '200% 200%', 'background-position': '100% 0' },
          '50%': { 'background-size': '200% 200%', 'background-position': '0 100%' },
          '100%': { 'background': '200% 200%', 'background-position': '100% 0' },
        },
        slide: { // 修改的 keyframes
          '0%': { 'background-position': '0% 0%', 'opacity': '0' },
          '50%': { 'background-position': '100% 0%', 'opacity': '1' },
          '100%': { 'background-position': '200% 0%', 'opacity': '0' },
        }
      },
      animation: {
        gradient: 'gradient 3s ease infinite',
        'spin-slow': 'spin 20s linear infinite',
        slide: 'slide 10s linear infinite', // 新增的動畫
      }
    },
  },
  plugins: [],
};
export default config;