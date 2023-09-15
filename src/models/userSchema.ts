import mongoose, { Schema } from "mongoose";

// Define Schema
const UserSchema = new Schema({
  name: String,
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
});

// Define Model
const User = mongoose.model("User", UserSchema);
export default User;
