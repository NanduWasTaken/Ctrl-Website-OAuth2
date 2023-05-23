const mongoose = require('mongoose')
const { Schema } = mongoose;

// Its Me Nandu 
const Users = new Schema({
  discordId: { type: String, required: true },
  username: { type: String, required: true },
  global_name: { type: String, require: true },
  discriminator: { type: String, required: true },
  email: { type: String, required: true },
  guilds: { type: Array, required: true },
  avatar: { type: String, required: true },
  accessToken: { type: String },
  refreshToken: { type: String },
  ctrl: { type: Boolean, default: false, required: true },
  date: { type: Date, default: Date.now, required: true }
});
const user = mongoose.model("user", Users)
module.exports = user;




