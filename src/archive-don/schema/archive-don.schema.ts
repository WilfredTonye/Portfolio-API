import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';

export type ArchiveDonDocument = ArchiveDon & Document;

@Schema({
    timestamps:true,
})
export class ArchiveDon {
  @Prop()
  nom_donateur:string; 
  @Prop({unique:true})
  email:string;
  @Prop()
  mobile:number;
  @Prop()
  montant:number;                                                                           
}
export const ArchiveDonSchema = SchemaFactory.createForClass(ArchiveDon); 