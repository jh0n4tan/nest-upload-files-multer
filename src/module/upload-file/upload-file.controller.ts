import { Controller,Post,UploadedFile,UseInterceptors,UploadedFiles } from '@nestjs/common';
import { Body, Get, Response } from '@nestjs/common/decorators';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UploadFileService } from './upload-file.service';

@Controller('api/v1/upload-file')
@ApiTags    ('Uploads')
export class UploadFileController {

    constructor(private uploadFileService:UploadFileService){

    }
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({
        description:"Uploads a file"
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema:{
            type:'object',
            properties:{
                file:{
                    type:'string',
                    format: 'binary'
                }
            }
        }
    })
    @ApiResponse({
        status:201,
        description:"uploaded correctly"
    })
    uploadFile(@UploadedFile() file:Express.Multer.File){
        return this.uploadFileService.uploadFile(file);
    } 

    @Post('upload-files')
    @UseInterceptors(FilesInterceptor('files'))
    @ApiOperation({
        description:"Uploads multiple files at the same time"
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema:{
            type:'object',
            properties:{
                files:{
                    type:'array',
                    items:{
                        type:'string',
                        format: 'binary'
                    }                
                }
            }
        }
    })
    @ApiResponse({
        status:201,
        description:"uploaded correctly"
    })
    uploadManyFiles(@UploadedFiles() files: Array<Express.Multer.File>){               
        return this.uploadFileService.uploadManyFiles(files);
    }
    
    @Post('download')
    @ApiOperation({
        description:"it Gets an especific file and downloads it"
    })    
    @ApiBody({
        schema:{
            type:'object',
            properties:{
                filename:{
                    type:'string'                    
                }
            }
        }
    })
    @ApiResponse({
        status:200,
        description:"downloaded correctly"
    })
    @ApiResponse({
        status:409,
        description:"file doesn't exists"
    })
    downloadFile(@Response() res, @Body() body:any){
        return this.uploadFileService.download(res,body.filename);
    }
    
}
