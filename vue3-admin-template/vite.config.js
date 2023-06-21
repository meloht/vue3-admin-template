import { fileURLToPath, URL } from "node:url";

import { defineConfig,  loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(),'');

  return {
    plugins: [
      vue(), 
      vueJsx(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      })
    ],
    // 本地反向代理解决浏览器跨域限制
    server: {

      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 线上API地址
          target: 'http://localhost:5180',
          // 本地API地址
          // target: 'http://localhost:8989',
          changeOrigin: true,
          rewrite: path =>
          path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
        }
      }
    },

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    }
   
  };
});
