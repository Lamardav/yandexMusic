import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type SongDocument = Song & Document;

@Schema()
export class Song {
  @Prop()
  name: string;

  @Prop()
  artist: string;

  @Prop()
  song: string;

  @Prop()
  listens: string;

  @Prop()
  picture: string;

  @Prop()
  audio: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const SongSchema = SchemaFactory.createForClass(Song);
