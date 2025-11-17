import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: 'src',
  publicDir: resolve(__dirname, 'assets'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    cssCodeSplit: true,
    minify: 'esbuild', // Fast and efficient minification
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        'privacy-policy': resolve(__dirname, 'src/privacy-policy/index.html'),
        'terms-of-service': resolve(__dirname, 'src/terms-of-service/index.html'),
        'accessibility-statement': resolve(__dirname, 'src/accessibility-statement/index.html'),
        'disclaimer': resolve(__dirname, 'src/disclaimer/index.html'),
        'success': resolve(__dirname, 'src/success.html'),
      },
    },
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096, // Inline small assets as base64
  },
  server: {
    port: 3000,
    open: true
  }
});

