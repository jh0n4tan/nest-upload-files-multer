import { Module,ConflictException } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadFileController } from './upload-file.controller';
import { UploadFileService } from './upload-file.service';

/*
en multermodule se puede usar dest:'./upload' para apuntar a alguna carpeta
en especifica, storage es para personalizar una funcion
*/
@Module({
  imports:[
    MulterModule.register({
      dest:'./upload',
      limits:{
        fieldSize: 2 * 1024 * 1024
      },
      fileFilter: function(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
          cb(new ConflictException('only images'),false);
        }
        cb(null,true);
      },
      storage: diskStorage({
        destination:function(req,file,cb){          
          cb(null,'./upload')
        },
        filename: function(req,file,cb){
          let filenameparts = file.originalname.split('.');
          filenameparts = filenameparts.slice(0,filenameparts.length -1);
          const filename = filenameparts.join('.');
          if(file.mimetype){
            const extension = file.mimetype.split('/')[1];
            cb(null,filename + '-' + Date.now() + '.' + extension);
          }else{
            cb(null,filename + '-' + Date.now());
          }
        }
      })
    })
  ],
  controllers: [UploadFileController],
  providers: [UploadFileService]
})
export class UploadFileModule {}
