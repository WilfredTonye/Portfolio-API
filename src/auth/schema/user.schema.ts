import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({
    timestamps:true,
})
export class User {
  @Prop()
  username:string; 
  @Prop({unique:true})
  email:string;
  @Prop()
  password:string; 
  @Prop()
  mobile:number;
}
export const UserSchema = SchemaFactory.createForClass(User); 