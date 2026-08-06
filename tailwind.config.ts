import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#0f172a",
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
        background: "#020617",
        foreground: "#ffffff"
      },
      borderRadius: {
        lg: "12px",
        md: "10px",
        sm: "8px"
      }
    }
  },
  plugins: []
};

export default config;
