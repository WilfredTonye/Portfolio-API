import  { IsString,IsNotEmpty,IsNumber, IsEmail, IsEnum } from "class-validator"
export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    readonly username:string;

    @IsEmail()
    @IsNotEmpty()
    readonly email:string;

    @IsString()
    @IsNotEmpty()
    readonly password:string

    @IsNumber()
    @IsNotEmpty()
    readonly mobile:number;

}