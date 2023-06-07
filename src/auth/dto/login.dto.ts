import  { IsString,IsNotEmpty, IsEmail, MinLength, } from "class-validator"
export class LoginDto{
    @IsEmail({}, {message:"Entrez une adresse valide"})
    @IsNotEmpty()
    readonly email:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password:string;

}