import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT: number = 3000;
const HOST: string = '0.0.0.0';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(PORT, HOST, () => console.log(`App is at http://${HOST}:${PORT}/list`));
}
bootstrap();
