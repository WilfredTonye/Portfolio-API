import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleShema } from './schema/article.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    AuthModule,
    MongooseModule.forFeature([{name:'Article', schema:ArticleShema}])
  ],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
