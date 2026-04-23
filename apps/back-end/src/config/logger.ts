import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

/**
 * 创建 Winston Logger 实例，替代 NestJS 内置 Logger
 * - 开发环境：彩色控制台输出
 * - 生产环境：JSON 格式输出，便于日志采集
 */
export const createLogger = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  return WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        level: 'debug',
        format: isProduction
          ? winston.format.combine(
              winston.format.timestamp(),
              winston.format.json(),
            )
          : winston.format.combine(
              winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
              utilities.format.nestLike('Bell', {
                prettyPrint: true,
                colors: true,
              }),
            ),
      }),
      // 错误日志写入文件
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
      }),
      // 全部日志写入文件
      new winston.transports.File({
        filename: 'logs/app.log',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
      }),
    ],
  });
};
