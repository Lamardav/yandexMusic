import { Module } from '@nestjs/common';
import { SongModule } from './song/song.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileService } from './file/file.service';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://Shpakov:dimm1201@yandexmusicclaster.6pne3.mongodb.net/?retryWrites=true&w=majority',
    ),
    SongModule,
    FileService,
  ],
})
export class AppModule {}
