import { Module } from '@nestjs/common';
import { UploadFileModule } from './module/upload-file/upload-file.module';

@Module({
  imports: [UploadFileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
