import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';
const r = (p: string) => resolve(__dirname, p);
const alias = {
  '@bwrong/type': r('packages/type/src/'),
};
export default defineConfig({
  resolve: {
    alias,
  },
  test: {
    environment: 'jsdom',
  },
});
