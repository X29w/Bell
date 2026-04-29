import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { StorageService } from './storage.service';

/** 允许的图片 MIME 类型 */
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

/** 最大文件大小：5MB */
const MAX_SIZE = 5 * 1024 * 1024;

@ApiTags('Upload')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard)
@Controller('upload')
export class UploadController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  @ApiOperation({ summary: '上传图片' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary', description: '图片文件' },
      },
    },
  })
  @ApiResponse({ status: 201, description: '上传成功，返回图片 URL' })
  @ApiResponse({ status: 400, description: '文件格式或大小不符合要求' })
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: MAX_SIZE },
  }))
  async upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('请选择要上传的文件');
    }

    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(`不支持的文件格式，仅支持: ${ALLOWED_TYPES.join(', ')}`);
    }

    const url = await this.storageService.save(file);
    return { url };
  }
}
