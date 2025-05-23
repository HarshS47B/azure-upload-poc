import { Controller, Post, Get, Delete, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { AzureStorageService } from './azure-storage.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly azureStorageService: AzureStorageService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = await this.azureStorageService.uploadFile(file);
    return { url: fileUrl };
  }

  @Get('files')
  async listFiles() {
    return await this.azureStorageService.listFiles();
  }

  @Delete('files/:blobName')
  async deleteFile(@Param('blobName') blobName: string) {
    await this.azureStorageService.deleteFile(blobName);
    return { message: 'File deleted successfully' };
  }
}
