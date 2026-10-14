import { buildApp } from '@/app';
import { config } from '@/config';

async function start() {
  try {
    const app = await buildApp();

    // Start server
    await app.listen({
      port: config.port,
      host: config.host,
    });

    console.info(`
    ╔═══════════════════════════════════════════╗
    ║   🚀 Server is running!                  ║
    ╠═══════════════════════════════════════════╣
    ║   Environment: ${config.nodeEnv.padEnd(24)} ║
    ║   URL: http://localhost:${config.port}         ║
    ║   Health: http://localhost:${config.port}/health ║
    ╚═══════════════════════════════════════════╝
    `);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle shutdown gracefully
process.on('SIGINT', () => {
  console.info('\n👋 Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.info('\n👋 Shutting down gracefully...');
  process.exit(0);
});

// Start the server
start();
