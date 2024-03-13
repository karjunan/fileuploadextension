import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './public/dist',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/style.[ext]',
        entryFileNames: 'assets/app.js',
      },
    },
  },
  // optimizeDeps: {
  //   include: ['./src/script/script.js'],
  // },
});
