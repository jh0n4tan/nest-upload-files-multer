import { Injectable } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { existsSync } from 'fs';

@Injectable()
export class UploadFileService {
    constructor(){
        
    }

    uploadFile(file:Express.Multer.File){
        if(file){
            const response = {
                originalName : file.originalname,
                filename: file.filename
            }
            return response;
        }
        return null;
    }

    uploadManyFiles(files:Array<Express.Multer.File>){
        const response = [];
        console.log("llega");
        
        for (const file of files) {
            const fileUpload = this.uploadFile(file);
            if(fileUpload){
                response.push(fileUpload);
            }            
        }        
        return response;
    }

    download(res,filename:string){
        if(existsSync('./upload/'+ filename)){
            return res.download('./upload/'+ filename);
        }
        throw new ConflictException("file doesn't exists");
    }
}
