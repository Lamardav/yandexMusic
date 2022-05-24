import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { SongService } from './song.service';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from '../dto/create-comment-dto';
import { Comment } from './schemas/comment.schema';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateSongDto } from '../dto/create-track-dto';

@Controller('/songs')
export class SongController {
  constructor(private songService: SongService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() dto: CreateSongDto) {
    const { picture, audio } = files;
    return this.songService.create(dto, picture[0], audio[0]);
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.songService.search(query);
  }

  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.songService.getAll(count, offset);
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.songService.getOneSong(id);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: ObjectId) {
    return this.songService.deleteOne(id);
  }

  @Post('/comment')
  addComment(@Body() dto: CreateCommentDto): Promise<Comment> {
    return this.songService.addComment(dto);
  }

  @Post('/listen/:id')
  addListen(@Param('id') id: ObjectId) {
    return this.songService.addListen(id);
  }
}
