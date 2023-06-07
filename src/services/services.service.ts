import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from './schema/services.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class ServicesService {
    constructor(
        @InjectModel(Service.name)
        private serviceModel: mongoose.Model<Service>,
    ){}

    async getAllServices(query:Query):Promise<Service[]> {

        const resPerPage = 3
        const currentPage = Number(query.page) || 1
        const skip = resPerPage*(currentPage -1)
        const keyword = query.keyword ? {
            Titre: {
                $regex:query.keyword,
                $options:'i'
            }
        }:{}
        const service = await this.serviceModel.find({...keyword}).limit(resPerPage).skip(skip);
        return service;
    }

    async createService(service:Service):Promise<Service> {
        const newService = await this.serviceModel.create(service)
        return newService
    }

    async getOneService(Id:string ):Promise<Service> {
        const serviceId = await this.serviceModel.findById(Id)
        if(! serviceId) {
            throw new NotFoundException('Article introuvable')
        }
        return serviceId
    }

    async updateService(Id:string, service:Service):Promise<Service> {
        return await this.serviceModel.findByIdAndUpdate(Id,service, {
            runValidators:true,
            new:true
        })
    }

    async deleteService(Id:string):Promise<Service> {
        return await this.serviceModel.findByIdAndDelete(Id)
    }
}
