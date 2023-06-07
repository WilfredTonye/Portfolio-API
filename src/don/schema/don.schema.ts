import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';

export type DonDocument = Don & Document;

@Schema({
    timestamps:true,
})
export class Don {
  @Prop()
  nom_donateur:string; 
  @Prop({unique:true})
  email:string;
  @Prop()
  mobile:number;
  @Prop()
  montant:number;                                                                           
}
export const DonSchema = SchemaFactory.createForClass(Don);