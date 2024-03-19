import mongoose from 'mongoose'

type Gender = 'F' | 'M' | 'O';

export interface Friend {
  id: string;
  name: string;
  gender: Gender;
  prompt: string;
  mainImage: string;
  avatarImage: string;
  description: string;
  greeting: string;
}

const FriendSchema = new mongoose.Schema<Friend>({
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
  },
  greeting: {
    type: String,
  }
})

const Friend = mongoose.models.Friend || mongoose.model<Friend>('Friend', FriendSchema)

Friend.schema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
}); 

export default Friend;
