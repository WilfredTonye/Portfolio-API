import { Body, Controller, Delete, Get, HttpStatus, Post, Param, Put, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/auth/schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { response } from 'express';
import {Query as ExpressQuery} from 'express-serve-static-core';

@Controller('user')
export class UserController {
    constructor(
        private userService:UserService
    ){}

    @Get()
    async getAllUsers(@Res() response, @Query() query:ExpressQuery):Promise<User[]> {
        try{
            const userData = await this.userService.getAllUsers(query)
            return response.status(HttpStatus.OK).json({
                message:"Liste des utlisateurs",
                userData
            })

        }catch(err){
            return response.status(err.status).json(err.response)
        }
    }

    @Post()
    async createUser(@Res() response,@Body() user:CreateUserDto):Promise<User> {

        try{
            const newUser = await this.userService.createUser(user);
            return response.status(HttpStatus.CREATED).json({
                message:"Utilisateur cree avec succes",
                newUser
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
    async getOneUser(@Res() response,@Param('id') id:string):Promise<User> {
        try{
            const user = await this.userService.getOneUser(id);
            return response.status(HttpStatus.OK).json({
                message:`l'utilisateur ${id} a ete trouve`,
                user
            })
        }catch {

        }
    }

    @Put(':id')
    async updateUser(@Res() response,@Param('id') id:string,@Body() users:UpdateUserDto):Promise<User> {
        try{
            const user = await this.userService.updateUser(id, users)
            return response.status(HttpStatus.OK).json({
                message:"L'utilisateur a ete modifie avec succes",
                user
            })
        }catch(err) {
            return response.status(err.status).json(err.response)
        }
    }

    @Delete(':id')
    async deleteUser(@Res() response,@Param('id') id:string):Promise<User> {
        try{
            const deleteuser = await this.userService.deleteUser(id);
            return response.status(HttpStatus.OK).json({
                message:"Suppression Reussi",
                deleteuser
            })
        }catch(err) {
            return response.status(err.status).json(err.response)
        }
    }
}
