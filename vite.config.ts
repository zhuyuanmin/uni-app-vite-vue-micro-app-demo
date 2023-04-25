import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { resolve } from 'path';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

const devEnv = process.env.NODE_ENV === 'development'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/',
      }
    ]
  },
  build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: devEnv ? false : true,
			},
		},
	},
  server:{
		// 选项写法
		proxy:{
			'/api': {
				target: 'https://test.clife.net',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '/api')
			},
		}
	},
});
