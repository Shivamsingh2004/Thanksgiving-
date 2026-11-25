export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { burnt: "#B5541F", ember: "#8C3A12", cream: "#FFF6E6", brown: "#3B1F0B", gold: "#E0A32E" },
      fontFamily: { display: ["'Playfair Display'", "serif"], body: ["'Inter'", "system-ui", "sans-serif"] },
      boxShadow: { soft: "0 12px 40px -12px rgba(59,31,11,.35)" },
    },
  },
  plugins: [],
};
