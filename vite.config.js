// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Bật globals để có thể sử dụng describe, it, expect mà không cần import
    environment: 'jsdom', // Môi trường kiểm thử cho React
    setupFiles: 'Koi_Veterinary_FE/src/Test/RegisterForm.test.jsx', // File cấu hình setup cho các bài test
  },
});
