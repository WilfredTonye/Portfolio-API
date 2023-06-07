import { Module } from '@nestjs/common';
import { DonController } from './don.controller';
import { DonService } from './don.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DonSchema } from './schema/don.schema';


@Module({
  imports:[
    MongooseModule.forFeature([{name:'Don',schema:DonSchema}])
  ],
  controllers: [DonController],
  providers: [DonService]
})
export class DonModule {}
