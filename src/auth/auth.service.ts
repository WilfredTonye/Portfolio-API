import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService:JwtService
    ){}

    async signUp(signUpDto:SignUpDto):Promise<{token:string}> {
        const {username, email, password, mobile } = signUpDto

        const hashedPassword = await bcrypt.hash(password, 10)
        
        const user = await this.userModel.create({
            username,
            email,
            password:hashedPassword,
            mobile
        })

        const token = this.jwtService.sign({id:user._id})

        return {token}
    }

    async login(loginDto:LoginDto):Promise<{token:string}> {
        const { email, password } =loginDto

        const user = await this.userModel.findOne({ email })

        if(!user) {
            throw new UnauthorizedException('email ou mot de passe invalide')
        }

        const isPasswordMacthed = await bcrypt.compare(password, user.password)

        if(!isPasswordMacthed) {
            throw new UnauthorizedException('email ou mot de passe invalide')
        }

        const token = this.jwtService.sign({id:user._id})

        return {token}
    }
}
