module.exports = {
  purge: ["./src/components/*.js", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        "350px": "350px",
        "450px": "450px",
        "700px": "700px",
      },
      height: {
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
  plugins: [],
};
