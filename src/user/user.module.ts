import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/auth/schema/user.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:"User", schema:UserSchema}])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
