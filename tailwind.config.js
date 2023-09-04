/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontWeight: {
        bold: "700",
      },
      colors: {
        primary: "#FFD370",
        secondary: "#333333",
        tertiary: "#9F9A91",
        warning: "#D87355",
        white: "#FFFFFF",
        line: "#E5E5E5",
      },
      backgroundImage: {
        colorBackground: "linear-gradient(177deg, #FFD370 54%,#fff 54%)",
        cover: "url(images/cover/coverPic2.png)",
        addBtn: "url(images/btn/plusBtn.png)",
        deleteBtn: "url(images/btn/vectorCross.png)",
      },
    },
  },
  plugins: [],
};
