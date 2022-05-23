import { Module } from '@nestjs/common';
import { SongModule } from './song/song.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Shpakov:dimm1201@yandexmusicclaster.6pne3.mongodb.net/?retryWrites=true&w=majority',
    ),
    SongModule,
  ],
})
export class AppModule {}
