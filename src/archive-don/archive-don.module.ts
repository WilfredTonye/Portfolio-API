import { Module } from '@nestjs/common';
import { ArchiveDonController } from './archive-don.controller';
import { ArchiveDonService } from './archive-don.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArchiveDonSchema } from './schema/archive-don.schema';
import { DonModule } from 'src/don/don.module';


@Module({
  imports:[
    MongooseModule.forFeature([{name:'Archive-don', schema:ArchiveDonSchema}])
  ],
  controllers: [ArchiveDonController],
  providers: [ArchiveDonService]
})
export class ArchiveDonModule {}
