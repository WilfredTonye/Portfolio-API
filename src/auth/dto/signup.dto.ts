import  { IsString,IsNotEmpty,IsNumber, IsEmail, MinLength, } from "class-validator"
export class SignUpDto{
    @IsString()
    @IsNotEmpty()
    readonly username:string;

    @IsEmail( {}, {message:'Veuillez une adresse mail valide'})
    @IsNotEmpty()
    readonly email:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password:string;

    @IsNumber()
    @IsNotEmpty()
    readonly mobile:number;

}