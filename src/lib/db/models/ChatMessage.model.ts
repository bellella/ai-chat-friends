import mongoose from 'mongoose'
import {ChatMessage} from '@/types';
export type Role = 'user' | 'assistant';

const ChatMessageSchema = new mongoose.Schema<ChatMessage>({
  _id: {
    type: String,
    required: false
  },
  userId: {
    type: String,
  },
  friendId: {
    type: String,
  },
  role: {
    type: String,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
}, { _id: false })

const ChatMessageModel = mongoose.models.ChatMessage || mongoose.model<ChatMessage>('ChatMessage', ChatMessageSchema)

ChatMessageModel.schema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
  }
}); 

export default ChatMessageModel;
