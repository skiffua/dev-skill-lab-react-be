import { build } from 'esbuild';

async function runBuild() {
  try {
    await build({
      entryPoints: ['src/server.ts'],
      bundle: true,
      platform: 'node',
      target: 'node20',
      format: 'esm',
      outdir: 'dist',
      sourcemap: true,
      // Вказуємо esbuild не чіпати залежності з node_modules, а імпортувати їх динамічно у рантаймі
      packages: 'external',
    });
    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

runBuild();
