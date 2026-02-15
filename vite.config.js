import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation-vendor': ['framer-motion', 'lottie-react', '@react-spring/web'],
          'icons-vendor': ['react-icons']
        }
      }
    },
    // Use esbuild minification (default, faster than terser)
    minify: 'esbuild',
    // Disable source maps for production (reduces bundle size)
    sourcemap: false,
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Additional optimizations
    cssCodeSplit: true,
    reportCompressedSize: false // Faster build
  }
})
