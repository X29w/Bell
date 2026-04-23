import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { setUpApiDoc } from './config/api-doc';
import { createLogger } from './config/logger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

const bootstrap = async () => {
  const logger = createLogger();

  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger,
  });
  app.setGlobalPrefix('api');

  // 安全中间件
  app.use(helmet());

  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger / Knife4j 配置 http://localhost:3000/doc.html
  setUpApiDoc(app);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
};

bootstrap();
