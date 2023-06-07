import  { IsString,IsNotEmpty,IsNumber, MaxLength } from "class-validator"
export class UpdateServiceDto{
    @IsString()
    @IsNotEmpty()
    readonly Nom_service:string;

    @IsString()
    @MaxLength(150)
    @IsNotEmpty()
    readonly description:string;

    @IsNumber()
    @IsNotEmpty()
    readonly prix:number;


}