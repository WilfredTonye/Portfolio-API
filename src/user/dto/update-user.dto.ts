import  { IsString,IsNotEmpty,IsNumber, IsEmail } from "class-validator"
export class UpdateUserDto{
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