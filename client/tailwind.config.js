module.exports = {
  purge: ["./src/components/*.js", "./src/components/**/*.js"],
  darkMode: false,
  theme: {
    extend: {
      width: {
        "350px": "350px",
        "450px": "450px",
        "700px": "700px",
      },
      height: {
        "400px": "400px",
        "550px": "550px",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
