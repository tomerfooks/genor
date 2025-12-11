import { createApp } from './app/index';
import { config } from './shared/index';

/**
 * Application Entry Point
 */
async function main(): Promise<void> {
  const app = createApp();

  app.listen(config.PORT, () => {
    console.log('🚀 Server started successfully');
    console.log(`📡 Environment: ${config.NODE_ENV}`);
    console.log(`🌐 Server running at http://localhost:${config.PORT}`);
    console.log(`💡 API available at http://localhost:${config.PORT}/api`);
    console.log(`❤️  Health check at http://localhost:${config.PORT}/api/health`);
  });
}

main().catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});
