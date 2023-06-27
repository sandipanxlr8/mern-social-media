import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 1,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 1,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    lcoation: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timeStamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
