import { Body, Controller, Get, Post } from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-track-dto';

@Controller('/songs')
export class SongController {
  constructor(private songService: SongService) {}

  @Post()
  create(@Body() dto: CreateSongDto) {
    return this.songService.create(dto);
  }

  @Get()
  getAll() {
    return 'song service get';
  }

  geytOne() {
    return null;
  }

  delete() {
    return null;
  }
}
