// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         // Fiverr exact colors
//         'fiverr-green': '#1DBF73',
//         'fiverr-green-dark': '#19A463',
//         'fiverr-green-light': '#E9F9F0',
//         'fiverr-gray': '#62646A',
//         'fiverr-dark': '#222325',
//         'fiverr-light': '#95979D',
//         'fiverr-border': '#E4E5E7',
//         'fiverr-bg': '#F7F7F7',
//       },
//       fontFamily: {
//         'macan': ['"Macan"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
//       },
//     },
//   },
//   plugins: [],
// }

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          500: '#1DBF73',
          600: '#19a463',
          50: '#e9f9f0',
        }
      },
    },
  },
  plugins: [],
}