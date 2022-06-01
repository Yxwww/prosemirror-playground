import { defineConfig } from 'vite'

const NODE_MODULES_ON_WATCH = ['prosemirror-view', 'prosemirror-state', 'prosemirror-model']

export default defineConfig({
  server: {
    watch: {
      ignored: NODE_MODULES_ON_WATCH.map(v => `!**/node_modules/${v}/**`)
    }
  },
  // The watched package must be excluded from optimization,
  // so that it can appear in the dependency graph and trigger hot reload.
  optimizeDeps: {
    exclude: [...NODE_MODULES_ON_WATCH]
  }
})
