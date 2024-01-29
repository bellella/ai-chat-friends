import mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
  id: string;
  email: string; // Google email 
  name: string;
  gender: 'F' | 'M' | 'O';
}

const UserSchema = new mongoose.Schema<IUser>({
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

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

User.schema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
}); 

export default User;
