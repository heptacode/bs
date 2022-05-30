const alias = require('esbuild-plugin-alias');

exports.default = {
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  platform: 'node',
  format: 'cjs',
  target: 'esnext',
  bundle: true,
  minify: true,
  plugins: [
    alias({
      '@': 'src',
    }),
  ],
};
