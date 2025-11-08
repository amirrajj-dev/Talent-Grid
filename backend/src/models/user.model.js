import mongoose from 'mongoose';
import { emailReg } from '../regex/email.reg.js';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (v) => emailReg.test(v),
        message: (props) => `${props.value} is not a valid email !`,
      },
    },
    profileImage: {
      type: String,
      default: '',
    },
    clerkId: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.user || mongoose.model('user', schema);

export default User;
