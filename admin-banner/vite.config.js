// // vite.config.js
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
//   server: {
//     host: '0.0.0.0',
//     port: 4100,
//     proxy: {
//       '/allproduct': 'http://localhost:4000',
//       '/addproduct': 'http://localhost:4000',
//       '/removeproduct':'http://localhost:4000',
//       '/upload': 'http://localhost:4000',
//     },
//     fs: {
//       strict: false,
//     },
//   },
// })
// later userd for dev mode
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
//   server: {
//     host: '0.0.0.0',
//     port: 4100,
//     proxy: {
//       '/addproduct': 'http://localhost:4000',
//       '/allproducts': 'http://localhost:4000',
//       '/removeproduct': 'http://localhost:4000',
//       '/upload': 'http://localhost:4000',
//       // Add any other backend endpoints as needed
//     },
//     historyApiFallback: true, // ✅ Needed for React Router to work on reload
//     fs: {
//       strict: false,
//     },
//   },
//   optimizeDeps: {
//     include: ['react-router-dom'],
//   },
// })




// for sake of production mode 
// vite.config.js
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   base: '/admin/',  //  THIS IS CRUCIAL
// })

// Later used for production mode
// vite.config.js
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'

// export default defineConfig({
//   base: '/admin/', // 👈 CRUCIAL for deploying to a subpath
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
//   build: {
//     outDir: 'dist',
//   },
//   optimizeDeps: {
//     include: ['react-router-dom'],
//   },
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/admin/', // ✅ Required for correct path resolution when deployed under /admin
  server: {
    // ✅ Only used in development
    host: '0.0.0.0',
    port: 4100,
    proxy: {
      '/addproduct': 'http://localhost:4000',
      '/listproduct': 'http://localhost:4000',
      '/removeproduct': 'http://localhost:4000',
      '/upload': 'http://localhost:4000',
    },
    historyApiFallback: true,
    fs: {
      strict: false,
    },
  },
})

