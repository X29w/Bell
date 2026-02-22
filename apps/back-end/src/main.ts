import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from "./app.module";
import helmet from 'helmet';
import * as compression from 'compression';
import * as cors from 'cors';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// 安全中间件
	app.use(helmet());
	
	// 压缩中间件
	app.use(compression());
	
	// CORS 配置
	app.use(cors());

	// 全局验证管道
	app.useGlobalPipes(new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true,
		transform: true,
	}));

	// Swagger 配置
	const config = new DocumentBuilder()
		.setTitle('Bell API')
		.setDescription('Bell 应用程序的 API 文档')
		.setVersion('1.0')
		.addBearerAuth()
		.build();
	
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api/docs', app, document);

	await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
