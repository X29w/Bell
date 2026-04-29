import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 文件存储服务
 * 当前实现：本地文件存储
 * 后续可替换为 OSS / MinIO / R2 等，只需替换此 service
 */
@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly uploadDir: string;
  private readonly baseUrl: string;

  constructor(private readonly config: ConfigService) {
    this.uploadDir = path.resolve(process.cwd(), 'uploads');
    const port = this.config.get<string>('PORT', '3000');
    this.baseUrl = this.config.get<string>('UPLOAD_BASE_URL', `http://localhost:${port}/uploads`);
    this.ensureDir();
  }

  /**
   * 保存文件到本地，返回可访问的 URL
   */
  async save(file: Express.Multer.File): Promise<string> {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    const subDir = this.getSubDir();
    const dirPath = path.join(this.uploadDir, subDir);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, filename);
    fs.writeFileSync(filePath, file.buffer);

    const url = `${this.baseUrl}/${subDir}/${filename}`;
    this.logger.log(`文件上传成功: ${url}`);
    return url;
  }

  /**
   * 删除文件
   */
  async remove(fileUrl: string): Promise<void> {
    try {
      const relativePath = fileUrl.replace(`${this.baseUrl}/`, '');
      const filePath = path.join(this.uploadDir, relativePath);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        this.logger.log(`文件删除成功: ${relativePath}`);
      }
    } catch (error) {
      this.logger.warn(`文件删除失败: ${fileUrl}`, error);
    }
  }

  /** 按日期分子目录：2026/04/28 */
  private getSubDir(): string {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}/${m}/${d}`;
  }

  /** 确保上传根目录存在 */
  private ensureDir(): void {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }
}
