export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        cloud: "#F1F5F9",
        indigoPop: "#4F46E5",
        lavender: "#818CF8",
        orangePop: "#F97316",
        mintPop: "#22C55E",
        lemonPop: "#FACC15",
        rosePop: "#FB7185",
        aquaPop: "#06B6D4"
      },
      fontFamily: {
        display: ["Manrope", "ui-sans-serif", "system-ui"],
        body: ["DM Sans", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        clay: "0 16px 40px rgba(15,23,42,.08)",
        claySoft: "0 8px 24px rgba(15,23,42,.06)",
        clayPressed: "0 1px 2px rgba(15,23,42,.08)"
      }
    }
  },
  plugins: []
};
