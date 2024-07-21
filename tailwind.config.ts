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
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "custom-brown": "rgba(139,69,19,0.8)",
        "custom-red": "rgba(165,42,42,0.8)",
        "custom-beige": "rgba(255,250,240,0.9)",
        "custom-blue": "#0000ff", // 新增的自定義顏色
      },
    },
  },
  plugins: [],
};
export default config;
