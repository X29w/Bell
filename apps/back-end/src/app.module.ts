import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { SpaceModule } from './modules/space/space.module';
import { CategoryModule } from './modules/category/category.module';
import { CommodityModule } from './modules/commodity/commodity.module';
import { ReminderModule } from './modules/reminder/reminder.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    SpaceModule,
    CategoryModule,
    CommodityModule,
    ReminderModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
