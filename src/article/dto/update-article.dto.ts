import  { IsString,IsNotEmpty,IsNumber, MaxLength } from "class-validator"
export class UpdateArticleDto{
    @IsString()
    @IsNotEmpty()
    readonly Titre:string;

    @IsString()
    @MaxLength(150)
    @IsNotEmpty()
    readonly Description:string;



}