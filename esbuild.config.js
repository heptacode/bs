const alias = require('esbuild-plugin-alias');

exports.default = {
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  platform: 'node',
  format: 'cjs',
  bundle: true,
  minify: true,
  plugins: [
    alias({
      '@': 'src',
    }),
  ],
};
