import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';
import { Query } from 'express-serve-static-core';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel:mongoose.Model<User>,
    ){}

    async getAllUsers(query:Query):Promise<User[]> {

        const resPerPage = 3
        const currentPage = Number(query.page) || 1
        const skip = resPerPage*(currentPage -1)
        const keyword = query.keyword ? {
            Titre: {
                $regex:query.keyword,
                $options:'i'
            }
        }:{}
        const users = await this.userModel.find({...keyword}).limit(resPerPage).skip(skip);
        return users;
    }

    async createUser(user:User):Promise<User> {
        const newUser = await this.userModel.create(user)
        return newUser
    }

    async getOneUser(Id:string ):Promise<User> {
        const userId = await this.userModel.findById(Id)
        if(! userId) {
            throw new NotFoundException('Utilisateur introuvable')
        }
        return userId
    }

    async updateUser(Id:string, user:User):Promise<User> {
        return await this.userModel.findByIdAndUpdate(Id,user, {
            runValidators:true,
            new:true
        })
    }

    async deleteUser(Id:string):Promise<User> {
        return await this.userModel.findByIdAndDelete(Id)
    }
}
