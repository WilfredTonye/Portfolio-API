import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';

export type ServiceDocument = Service & Document;

@Schema({
    timestamps:true,
})
export class Service {
  @Prop()
  Nom_service:string; 
  @Prop()
  description:string;
  @Prop()
  prix:number;
}
export const ServiceShema = SchemaFactory.createForClass(Service);