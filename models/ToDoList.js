const mongoose=require("mongoose")

const ToDoListSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true,
    },
    tasks: [
        {
          type: String,
          
          ref: "tasks",
        },
      ],
  
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
        },
})

module.exports = mongoose.model('ToDoList',ToDoListSchema);

