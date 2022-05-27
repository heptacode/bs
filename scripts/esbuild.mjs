import esbuild from 'esbuild';
import alias from 'esbuild-plugin-alias';
import { run } from 'esbuild-plugin-run';

try {
  esbuild.build({
    entryPoints: ['src/index.ts'],
    platform: 'node',
    format: 'cjs',
    bundle: true,
    minify: true,
    watch: true,
    plugins: [
      alias({
        '@': 'src',
      }),
      run(),
    ],
    outfile: 'dist/app.js',
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
