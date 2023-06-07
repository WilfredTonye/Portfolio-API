import { Body, Controller, Delete, Get, HttpStatus, Post, Param, Put, Query, Res } from '@nestjs/common';
import { ServicesService } from './services.service';
import { response } from 'express';
import {Query as ExpressQuery} from 'express-serve-static-core';
import { Service } from './schema/services.schema';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
    constructor(
        private serviceService:ServicesService
    ){}

    @Get()
    async getAllServices(@Res() response, @Query() query:ExpressQuery):Promise<Service[]> {
        try{
            const serviceData = await this.serviceService.getAllServices(query)
            return response.status(HttpStatus.OK).json({
                message:"Liste des services",
                serviceData
            })

        }catch(err){
            return response.status(err.status).json(err.response)
        }
    }

    @Post()
    async createService(@Res() response,@Body() service:CreateServiceDto):Promise<Service> {

        try{
            const newArticle = await this.serviceService.createService(service);
            return response.status(HttpStatus.CREATED).json({
                message:"Service cree avec succes",
                newArticle
            })
        }catch(error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode:400,
                message:"Echec de la creation",
                error:"Bad_Request"
            })
        }
    }

    @Get(':id')
    async getOneArticle(@Res() response,@Param('id') id:string):Promise<Service> {
        try{
            const service = await this.serviceService.getOneService(id);
            return response.status(HttpStatus.OK).json({
                message:`le service ${id} a ete trouve`,
                service
            })
        }catch {

        }
    }

    @Put(':id')
    async updateArticle(@Res() response,@Param('id') id:string,@Body() service:UpdateServiceDto):Promise<Service> {
        try{
            const services = await this.serviceService.updateService(id, service)
            return response.status(HttpStatus.OK).json({
                message:"Le service a ete modifie avec succes",
                services
            })
        }catch(err) {
            return response.status(err.status).json(err.response)
        }
    }

    @Delete(':id')
    async deleteArticle(@Res() response,@Param('id') id:string):Promise<Service> {
        try{
            const deleteservice = await this.serviceService.deleteService(id);
            return response.status(HttpStatus.OK).json({
                message:"Suppression Reussi",
                deleteservice
            })
        }catch(err) {
            return response.status(err.status).json(err.response)
        }
    }
}
