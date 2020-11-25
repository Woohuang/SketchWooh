import { defineConfig } from 'umi';

export default defineConfig({
  exportStatic: {
    htmlSuffix: true,
    dynamicRoot: true,
  },
  publicPath: './',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
});
