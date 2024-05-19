import { UserTemp } from '@/types/user';
import mongoose from 'mongoose'

const UserTempSchema = new mongoose.Schema<UserTemp>({
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

const UserTempModel = mongoose.models.UserTemp || mongoose.model<UserTemp>('UserTemp', UserTempSchema)


UserTempModel.schema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
}); 

export default UserTempModel;