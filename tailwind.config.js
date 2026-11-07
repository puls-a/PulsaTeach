export default {
  content: ["./index.html", "./src/**/*.{js,jsx}", "!./src/content/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18201F",
        cloud: "#F4F1EA",
        slate: { 500: "#5F6B7F" },
        indigoPop: "#4338CA",
        lavender: "#818CF8",
        orangePop: "#F97316",
        mintPop: "#22C55E",
        lemonPop: "#FACC15",
        rosePop: "#FB7185",
        aquaPop: "#06B6D4"
      },
      fontFamily: {
        display: ["ui-serif", "Iowan Old Style", "Palatino Linotype", "Georgia", "serif"],
        body: ["Aptos", "Segoe UI Variable", "Segoe UI", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        clay: "0 18px 45px rgba(24,32,31,.08)",
        claySoft: "0 6px 20px rgba(24,32,31,.05)",
        clayPressed: "0 1px 2px rgba(15,23,42,.08)"
      }
    }
  },
  corePlugins: {
    preflight: false
  },
  plugins: []
};
