
const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: "What is your username?"
    },
    email: {
      type: String,
      unique: true,
      required: "What is your email address?"
    },
    expenses: [{
      amount: Number,
      category: String,
      subCategory: String
    }],
    

})

const User = mongoose.model("User", UserSchema);

module.exports = User;