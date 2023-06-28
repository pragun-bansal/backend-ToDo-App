const ToDoModel = require("../models/ToDoModel")

const getToDo = async(req,res)=>{
    const todo = await ToDoModel.find()
    .catch((err)=>{console.log(err)})
    res.send(todo)
}

const saveToDo = async(req,res)=>{
    const {text} = req.body
    console.log(req.body)
    ToDoModel
    .create({text})
    .then((data)=>{
        console.log("Added Successfully....");
        console.log(data);
        res.send(data)
    })
    .catch((err)=>{console.log(err)})
    
}

const updateToDo = (req,res)=>{
    const {_id,text}=req.body
    ToDoModel
    .findByIdAndUpdate(_id,{text})
    .then((data)=>{
        console.log("Updated Successfully....");
        console.log(data);
        res.send(data)
    })
    .catch((err)=>{console.log(err)})
}

const deleteToDo = (req,res)=>{
    const {_id}=req.body
    console.log(req.body)
    ToDoModel
    .findByIdAndDelete(_id)
    .then((data)=>{
        console.log("Deleted Successfully....");
        console.log(data);
        res.send(data)
    })
    .catch((err)=>{console.log(err)})
}

module.exports={
    getToDo,
    saveToDo,
    updateToDo,
    deleteToDo
}