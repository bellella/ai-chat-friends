import mongoose from 'mongoose'

export type Role = 'user' | 'assistant';

export interface IChatHistory {
  id: string;
  userId: string;
  friendId: string;
  role: Role;
  content: string;
  createdAt: Date;
}

const ChatHistorySchema = new mongoose.Schema<IChatHistory>({
  id: {
    type: String,
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
})

const ChatHistory = mongoose.models.ChatHistory || mongoose.model<IChatHistory>('ChatHistory', ChatHistorySchema)

ChatHistory.schema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
}); 

export default ChatHistory;
