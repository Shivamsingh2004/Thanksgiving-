export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sun: "#FDB022", sunlight: "#FFD66B", butter: "#FFEBAE",
        cocoa: "#4A2416", cocoa2: "#5E2F1C", tomato: "#E5483B",
        pumpkin: "#F28A1E", slate: "#3F5F6E", mustard: "#C99A2E",
        paper: "#F3F3FA", ink: "#1E1A2B", line: "#8A5A2B",
      },
      fontFamily: {
        script: ["'Playball'", "cursive"],
        serif: ["'Lora'", "Georgia", "serif"],
        block: ["'Oswald'", "'Impact'", "sans-serif"],
        body: ["'Poppins'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        panel: "0 18px 40px -14px rgba(74,36,22,.55)",
        card: "0 10px 30px -10px rgba(30,26,43,.35)",
      },
    },
  },
  plugins: [],
};
