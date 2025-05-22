import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const env = configService.get<string>('node_env');
  const port = configService.get<number>('port');

  //configuration swagger
  if (env !== 'production') {
    setupSwagger(app);
  }

  await app.listen(port ?? 3000);
}
bootstrap().catch((err) => {
  console.log(err);
  process.exit(1);
});
