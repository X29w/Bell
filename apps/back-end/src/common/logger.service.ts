import { Injectable } from "@nestjs/common";
import { join } from "path";
import { createLogger, format, transports } from "winston";

@Injectable()
export class LoggerService {
  private logger = createLogger({
    level: "info",
    format: format.combine(
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json(),
    ),
    defaultMeta: { service: "bell-backend" },
    transports: [
      new transports.File({
        filename: join(process.cwd(), "logs", "error.log"),
        level: "error",
      }),
      new transports.File({
        filename: join(process.cwd(), "logs", "combined.log"),
      }),
    ],
  });

  constructor() {
    // 如果不是生产环境，也输出到控制台
    if (process.env.NODE_ENV !== "production") {
      this.logger.add(
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
      );
    }
  }

  log(message: string, meta?: any) {
    this.logger.info(message, meta);
  }

  error(message: string, trace?: string, meta?: any) {
    this.logger.error(message, { trace, ...meta });
  }

  warn(message: string, meta?: any) {
    this.logger.warn(message, meta);
  }

  debug(message: string, meta?: any) {
    this.logger.debug(message, meta);
  }

  verbose(message: string, meta?: any) {
    this.logger.verbose(message, meta);
  }
}
