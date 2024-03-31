
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  
    theme: {
      extend: {
        fontFamily: {
          InterRegular: ["Inter_400Regular"],
          InterMedium: ["Inter_500Medium"],
          InterSemibold: ["Inter_600SemiBold"],
          InterBold: ["Inter_700Bold"],
          InterExtrabold: ["Inter800ExtraBold"]
        }
      },
    },
    plugins: [],
  }
