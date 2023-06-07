import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';

export type UserDocument = User & Document;

export enum Status {
  Admin="admin",
  User="user",
}

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
  @Prop()
  status: Status;
}
export const UserSchema = SchemaFactory.createForClass(User); 