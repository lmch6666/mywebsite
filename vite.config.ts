import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

// Figma Make exports imports like "@radix-ui/react-dialog@1.1.6"
function figmaImportResolver() {
  return {
    name: 'figma-import-resolver',
    resolveId(id, importer, options) {
      const match = id.match(/^(.+)@\d+\.\d+\.\d+$/)
      if (!match) return null
      return this.resolve(match[1], importer, options)
    },
  }
}

export default defineConfig({
  plugins: [
    figmaImportResolver(),
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
    },
  },
  build: {
    rollupOptions: {
      // lucide-react 0.487 内部是 1773 个独立图标文件，`import { X } from
      // 'lucide-react'` 这种 barrel 导入会让 rollup 逐个打开它们才能 tree-shake。
      // rollup 默认并发 20 个文件操作，在 fd 上限较低的构建容器里会触发
      // EMFILE: too many open files。降到 4 是 rollup 官方给的解法，
      // 只是串行度变高、构建慢几秒，产物不变。
      maxParallelFileOps: 4,
    },
  },
})
