import { User } from '@/types/user';
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema<User>({
  _id: {
    type: mongoose.Types.ObjectId,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
})

const UserModel = mongoose.models.User || mongoose.model<User>('User', UserSchema);

UserModel.schema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id.toString();
      // delete ret._id;
      // delete ret.__v;
  }
}); 

export default UserModel;
