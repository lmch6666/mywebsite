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
})
