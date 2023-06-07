import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Don } from './schema/don.schema';
import * as mongoose from 'mongoose';
import { ArchiveDon } from 'src/archive-don/schema/archive-don.schema';
import { Query } from 'express-serve-static-core';

@Injectable()
export class DonService {
    constructor(
        @InjectModel(Don.name)
        private donModel:mongoose.Model<Don>,
    ){}

    async getAllDon(query:Query):Promise<Don[]> {

        const resPerPage = 3
        const currentPage = Number(query.page) || 1
        const skip = resPerPage*(currentPage -1) 
        const keyword = query.keyword ? {
            Titre: {
                $regex:query.keyword,
                $options:'i'
            }
        }:{}
        const don = await this.donModel.find({...keyword}).limit(resPerPage).skip(skip);
        return don;
    }

    async createDon(don:Don):Promise<Don> {
        const new_don = await this.donModel.create(don)
        return new_don
    }

    async getOneDon(Id:string ):Promise<Don> {
        const donId = await this.donModel.findById(Id)
        if(! donId) {
            throw new NotFoundException('Don introuvable')
        }
        return donId
    }

    async updateDon(Id:string, don:Don):Promise<Don> {
        return await this.donModel.findByIdAndUpdate(Id,don, {
            runValidators:true,
            new:true
        })
    }

    //async archiveDon(Id:string):Promise<void> {
      //  const deleteDon = await this.donModel.findOneAndDelete({ _id:Id}).exec();
        // await this.archivedonModel.insertMany(deleteDon)
   // }
}
