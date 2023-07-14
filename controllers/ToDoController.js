const TasksModel = require("../models/Tasks");
const ToDoList = require("../models/ToDoList");
const User = require("../models/User");


const saveTask = async (req, res) => {
    try {
      const { text, toDoId } = req.body;
        console.log(req.body);
      const task = await TasksModel.create({ text: text, checked: false,todolist:toDoId });
  
      await ToDoList.findByIdAndUpdate(
        { _id: toDoId },
        { $push: { tasks: task._id } }
      );
  
      console.log("Added Successfully....");
      console.log(task);
  
      res.send(task);
    } catch (err) {
      console.log(err);
      res.status(500).send("Failed to save task");
    }
  };
  

const updateTask= (req,res)=>{
    const {_id,text}=req.body
    TasksModel
    .findByIdAndUpdate(_id,{text , checked:false})
    .then((data)=>{
        console.log("Updated Successfully....");
        console.log(data);
        res.send(data)
    })
    .catch((err)=>{console.log(err)})
}


const toggleCheckTask = async (req, res) => {
    const { _id } = req.body;
    console.log(req.body);
    try {
      const task = await TasksModel.findById(_id);
      if (!task) {
        throw new Error('Task not found');
      }
      
      task.checked = !task.checked;
      const updatedTask = await task.save();
      
      console.log("Toggled Successfully....");
      console.log(updatedTask);
      
      res.send(updatedTask);
    } catch (err) {
      console.log(err);
      res.status(500).send("Failed to toggle task");
    }
  };
  
  


// const deleteTask = async(req,res)=>{
//     const {_id}=req.body
//     console.log(req.body)
//     const task =await TasksModel.findById(_id);
//     console.log(task);
//     const toDoId=task.todolist;
//     await TasksModel.findByIdAndDelete(_id);

//     ToDoList.findById(toDoId)
//     .then((data)=>{
//         const newTasks=data.tasks.filter((task)=>{task!=_id})
//         ToDoList.findByIdAndUpdate(toDoId,{tasks:newTasks}).then(data=>{
//             console.log("Deleted Successfully....");
//         console.log(data);
//         res.send(data)
//         })
        
//     })
//     .catch((err)=>{console.log(err)})
// }


const deleteTask = async (req, res) => {
    const { _id } = req.body;
    console.log(req.body);
    const task = await TasksModel.findById(_id);
    console.log(task);
    const toDoId = task.todolist;
    await TasksModel.findByIdAndDelete(_id);
  
    ToDoList.findById(toDoId)
      .then((data) => {
        const newTasks = data.tasks.filter((task) => {
          return task !== _id; // Add return statement here
        });
        ToDoList.findByIdAndUpdate(toDoId, { tasks: newTasks }).then((data) => {
          console.log("Deleted Successfully....");
          console.log(data);
          res.send(data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  





module.exports={
    saveTask,
    updateTask,
    deleteTask,
    toggleCheckTask,
}