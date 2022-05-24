import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Song, SongDocument } from './schemas/song.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from '../dto/create-comment-dto';
import { FileService } from '../file/file.service';
import { CreateSongDto } from '../dto/create-track-dto';
import { FileTypeEnum } from '../dto/enumFileType';

@Injectable()
export class SongService {
  constructor(
    @InjectModel(Song.name) private songDocumentModel: Model<SongDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateSongDto, picture, audio): Promise<Song> {
    const audioPath = this.fileService.createFile(FileTypeEnum.AUDIO, audio);
    const picturePath = this.fileService.createFile(
      FileTypeEnum.IMAGE,
      picture,
    );
    return await this.songDocumentModel.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });
  }

  async getAll(count = 10, offset = 0) {
    return this.songDocumentModel.find().skip(offset).limit(count);
  }

  async getOneSong(id: ObjectId) {
    return this.songDocumentModel.findById(id).populate('comments');
  }

  async deleteOne(id: ObjectId) {
    const data = await this.songDocumentModel.findByIdAndDelete(id);
    return data._id;
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.songDocumentModel.findById(dto.songId);
    const comment = await this.commentModel.create(dto);
    track.comments.push(comment._id);
    await track.save();
    return comment;
  }

  async addListen(id: ObjectId) {
    const track = await this.songDocumentModel.findById(id);
    track.listens += 1;
    await track.save();
  }

  async search(query: string) {
    return this.songDocumentModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
  }
}
