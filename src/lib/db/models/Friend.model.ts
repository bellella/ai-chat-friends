import { Friend } from '@/types';
import mongoose from 'mongoose'

const FriendSchema = new mongoose.Schema<Friend>({
  _id: {
    type: mongoose.Types.ObjectId,
  },
  id: {
    type: String
  },
  name: {
    type: String,
  },
  subname: {
    type: String,
  },
  gender: {
    type: String,
  },
  prompt: {
    type: String,
  },
  mainImage: {
    type: String,
  },
  avatarImage: {
    type: String,
  },
  description: {
    type: String,
  },
  greeting: {
    type: String,
  }
})

const FriendModel = mongoose.models.Friend || mongoose.model<Friend>('Friend', FriendSchema)

FriendModel.schema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id.toString();
      // delete ret._id;
      // delete ret.__v;
  }
}); 

export default FriendModel;
