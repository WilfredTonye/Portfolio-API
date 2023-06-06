import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';

export type ArticleDocument = Article & Document;

@Schema({
    timestamps:true,
})
export class Article {
  @Prop()
  Titre:string; 
  @Prop()
  Description:string;
  
}
export const ArticleShema = SchemaFactory.createForClass(Article);