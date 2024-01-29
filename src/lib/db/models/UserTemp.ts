import mongoose from 'mongoose'

export interface IUserTemp extends mongoose.Document {
  id: string;
  email: string; // Google email 
  name: string;
  gender: 'F' | 'M' | 'O';
}

const UserTempSchema = new mongoose.Schema<IUserTemp>({
  id: {
    type: String,
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

const UserTemp = mongoose.models.UserTemp || mongoose.model<IUserTemp>('UserTemp', UserTempSchema)


UserTemp.schema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
}); 

export default UserTemp;