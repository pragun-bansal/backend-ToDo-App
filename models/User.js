const { default: mongoose, Mongoose } = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please fill a valid email address",
        ],
        validate: [isEmail, "invalid email"],
      },
      pfp: {
        type: String,
      },
      hash: {
        type: String,
        required: true,
      },
      salt: {
        type: String,
        unique: true,
      },
      todolists:[{
        type: mongoose.Types.ObjectId,
        ref: "TodoLists",
      }]
})

module.exports = mongoose.model('User',UserSchema);