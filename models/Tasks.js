
const mongoose=require("mongoose")

const TasksSchema = new mongoose.Schema({
    text:{
        type:String,
        checked:Boolean,
        require:true
    },
    checked:{
        type:Boolean,
    },
    todolist:{
        type:mongoose.Types.ObjectId,
        required:true,
    }
})

module.exports = mongoose.model('Tasks',TasksSchema);