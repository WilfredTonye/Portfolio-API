import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './article/article.module';
import { ServicesModule } from './services/services.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DonModule } from './don/don.module';
import { ArchiveDonModule } from './archive-don/archive-don.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    ArticleModule,
    ServicesModule,
    AuthModule,
    UserModule,
    DonModule,
    ArchiveDonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
