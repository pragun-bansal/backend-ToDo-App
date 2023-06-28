const mongoose=require("mongoose")

const ToDoSchema = new mongoose.Schema({
    text:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('ToDo',ToDoSchema);