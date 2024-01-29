import mongoose from 'mongoose'

type Gender = 'F' | 'M' | 'O';

export interface IFriend {
  id: string;
  name: string;
  gender: Gender;
  prompt: string;
  mainImage: string;
  avatarImage: string;
  description: string;
}

const FriendSchema = new mongoose.Schema<IFriend>({
  id: {
    type: String,
  },
  name: {
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
  }
})

const Friend = mongoose.models.Friend || mongoose.model<IFriend>('Friend', FriendSchema)

Friend.schema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
}); 

export default Friend;
