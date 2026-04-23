import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { knife4jSetup } from "nest-knife4j";

export const setUpApiDoc = (app: INestApplication) => {
  const NAME = "Bell API";
  const VERSION = "1.0.0";
  const config = new DocumentBuilder()
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "Authorization",
        description: "Enter JWT token",
        in: "header",
      },
      "Authorization",
    )
    .setTitle(NAME)
    .setDescription("Bell 应用程序的 API 文档")
    .setVersion(VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/swagger", app, document);
  knife4jSetup(app, [
    {
      name: NAME,
      url: `/api/swagger-json`,
      swaggerVersion: VERSION,
      location: "/api/swagger-json",
    },
  ]);
};
