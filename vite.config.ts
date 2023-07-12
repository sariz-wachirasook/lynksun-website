import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

// const { VITE_API_BASE_URL } = loadEnv('', process.cwd());

export default defineConfig({
  server: {
    port: 3000,

    proxy: {
      '/api/v1': 'http://localhost:8080',
    },
  },
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
});
