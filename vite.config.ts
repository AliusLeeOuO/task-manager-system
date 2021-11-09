import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import Components from 'unplugin-vue-components/vite'
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id:string) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver()
      ],
      dts: true
    }),
    styleImport({
      libs: [{
        libraryName: "ant-design-vue",
        esModule: true,
        resolveStyle: (name: string) => {
          return `ant-design-vue/es/${name}/style/css`
        }
      }]
    })
  ]
})
