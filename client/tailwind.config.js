/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard-Regular", "Apple SD Gothic Neo", "sans-serif"],
        pretendardBold: [
          "Pretendard-Bold",
          "Apple SD Gothic Neo",
          "sans-serif",
        ],
      },
      screens: {
        tablet: "640px",
        laptop: "1024px",
        desktop: "1280px",
        maxwidth: "1440px",
      },
      width: {
        maxwidth: "1440px",
      },
      maxWidth: {
        maxwidth: "1440px",
      },
      colors: {
        deeporange: "#EA6943",
        shalloworange: "#F1A35A",
        gray: "#767676",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
