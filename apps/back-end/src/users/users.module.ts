import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { LoggerService } from '../common/logger.service';
import { AuthModule } from '../common/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class UsersModule {}