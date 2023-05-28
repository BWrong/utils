import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
const resolve = (p: string) => path.resolve(p);

// https://vitejs.dev/config/

export default ({ mode }) => {
  const ROOT = process.cwd();
  const { VITE_APP_TITLE, VITE_APP_API_HOST, VITE_APP_API_ROOT } = loadEnv(mode, ROOT);
  return defineConfig({
    resolve: {
      alias: {
        '@': resolve('./src'),
      },
    },
    plugins: [vue()],
    server: {
      port: 3000,
      open: true,
      host: '0.0.0.0',
      proxy: {
        // 代理配置
        [VITE_APP_API_ROOT]: {
          target: VITE_APP_API_HOST, // 你接口的域名
          changeOrigin: true,
        },
      },
    },
  });
};
