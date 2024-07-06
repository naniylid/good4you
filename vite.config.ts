import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sass from 'sass';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
});
