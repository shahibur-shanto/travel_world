import { Server } from 'http';
import app from './app';
import config from './config';
// import { errorlogger, logger } from './shared/logger';

async function bootstrap() {
  const server: Server = app.listen(config.port, () => {
    // logger.info(`Server running on port ${config.port}`);
    console.log(`Server listening on Port ${config.port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log('Server closed');
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: string) => {
    console.log(error);
    throw new Error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}

bootstrap();
