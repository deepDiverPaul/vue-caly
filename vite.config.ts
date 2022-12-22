import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      dts({
        // tsConfigFilePath: './tsconfig.app.json',
        skipDiagnostics: true,
        // entryRoot: resolve(__dirname, 'src/plugin/index.ts'),
        // outputDir: resolve(__dirname, 'dist/'),
        outputDir: 'dist',
        copyDtsFiles: true,
        beforeWriteFile: (filePath, content) => {
          if(filePath.includes('env.d.ts')) return false;
          if(filePath.includes('shim-vue.d.ts')) return false;
          return {
            filePath: filePath.replace('/vue-caly/dist/src/plugin/', '/vue-caly/dist/',),
            content
          }
        }
      }),
      vue({
        customElement: false,
        isProduction: true
      }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // minify: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: [
        resolve(__dirname, 'src/plugin/index.ts'),
      ],
      name: 'VueCaly',
      // the proper extensions will be added
      fileName: 'vue-caly',
      // formats: ['es', 'cjs']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
        exports: 'named'
      },
    },
  },
})
