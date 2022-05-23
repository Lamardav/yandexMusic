import { Get, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Song, SongDocument } from './schemas/song.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateSongDto } from './dto/create-track-dto';

@Injectable()
export class SongService {
  constructor(
    @InjectModel(Song.name) private songDocumentModel: Model<SongDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(dto: CreateSongDto): Promise<Song> {
    return await this.songDocumentModel.create({ ...dto, listens: 0 });
  }

  @Get()
  async getAll() {
    return 'song service get';
  }

  async geytOne() {
    return null;
  }

  async delete() {
    return null;
  }
}
