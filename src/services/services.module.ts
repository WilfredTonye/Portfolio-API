import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { ServiceShema } from './schema/services.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:"Service", schema:ServiceShema}])],
  controllers: [ServicesController],
  providers: [ServicesService]
})
export class ServicesModule {}
