import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import path from 'node:path'
import { defineConfig, normalizePath, PluginOption } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { createLibEntryFileName } from '../vite-config/pluginRollupOutput'

const packageId = 'cad-simple-viewer'
const mtextRendererDist = normalizePath(
  path.resolve(
  __dirname,
  '../../../mtext-renderer/packages/mtext-renderer/dist'
  )
)

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: 'src/index.ts',
      name: packageId,
      fileName: format => createLibEntryFileName(packageId, format)
    },
    minify: true,
    rollupOptions: {
      external: ['@mlightcad/mtext-renderer'],
      output: {
        chunkFileNames: `${packageId}-[name]-[hash].js`
      }
    }
  },
  plugins: [
    peerDepsExternal() as PluginOption,
    viteStaticCopy({
      targets: [
        {
          src: './node_modules/@mlightcad/dxf-json-converter/dist/dxf-parser-worker.js',
          dest: ''
        },
        {
          src: './node_modules/@mlightcad/libredwg-converter/dist/libredwg-parser-worker.js',
          dest: ''
        },
        {
          src: `${mtextRendererDist}/mtext-renderer-worker.js`,
          dest: ''
        }
      ]
    })
  ]
})
