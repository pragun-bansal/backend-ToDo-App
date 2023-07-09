const User =require("../../models/User");
const crypto = require("crypto");
const ToDoList = require("../../models/ToDoList");

function genPassword(password) {
    var salt = crypto.randomBytes(32).toString("hex");
    var genHash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");
  
    return {
      salt: salt,
      hash: genHash,
    };
  }


const registerUser = async (userBody) => {
    // generate password
    console.log(userBody);
    const {
      salt,
      hash
    } = genPassword(userBody.password);
    
    const list = await ToDoList.create({
        name:"New List",
        Tasks:[],
    })
    // use repository to create and save the user
    const user = new User({
        name:userBody.name,
        email:userBody.email,
        pfp:userBody.pfp,
        hash,
        salt,
        todolists:[list],
      });
      console.log(user);
      ToDoList.findOneAndUpdate(list._id,{user_id:user._id})
      .then(async()=>{
        const registeredUser = await user.save();
        console.log(user);
        return registeredUser;
    })
    .catch((err)=>{
        console.log(err);
    })
    // return registeredUser;
  };

  module.exports={
    registerUser,
  }