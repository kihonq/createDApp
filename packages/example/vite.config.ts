import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import copy from 'rollup-plugin-copy'

export default defineConfig({
  plugins: [
    solidPlugin(),
    copy({
      targets: [{ src: 'src/_redirects', dest: '' }],
    }),
  ],
  build: {
    outDir: 'build',
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  resolve: {
    alias: {
      '@createdapp/coingecko': '@createdapp/coingecko/src/index.ts',
      '@createdapp/core': '@createdapp/core/src/index.ts',
    },
  },
})
