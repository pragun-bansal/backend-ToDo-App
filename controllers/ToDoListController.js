const TasksModel = require("../models/Tasks");
const ToDoList = require("../models/ToDoList");
const User = require("../models/User");
const mongoose = require("mongoose")


// const getToDoList = async(req,res)=>{
//     const{toDoListId}=req.body;
//     const todo = await ToDoList.findById(toDoListId)
//     .catch((err)=>{console.log(err)})
//     console.log(todo);
//     const list=[];
//     todo.tasks.map((task)=>{
//       const currentTask = TasksModel.findById(task);
//       list.push(currentTask);
//     })
//     res.send(list)
// }

// const getToDoList = async (req, res) => {
//   console.log(req.body);
//   const {toDoListId}=req.body;
//   console.log(toDoListId)
//   try {
//     const todo = await ToDoList.findById(toDoListId).catch((err) => {
//       console.log(err);
//     });

//     console.log(todo);

//     const list = await Promise.all(
//       todo.tasks.map(async (task) => {
//         const currentTask = await TasksModel.findById(task);
//         return currentTask;
//       })
//     );
//       console.log(list);
//     res.send(list);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Failed to retrieve to-do list");
//   }
// };

const getToDoList = async (req, res) => {
  console.log(req.body);
  const { toDoListId } = req.body;
  console.log(toDoListId);
  try {
    const todo = await ToDoList.findById(toDoListId).catch((err) => {
      console.log(err);
    });

    console.log(todo);

    const list = await Promise.all(
      todo.tasks.map(async (task) => {
        const currentTask = await TasksModel.findById(task);
        return currentTask;
      })
    );
    console.log(list);
    res.send({list,todo});
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to retrieve to-do list");
  }
};


const updateListName = async(req,res)=>{
    const {toDoListId,text}=req.body;
    try{
      const todo =await ToDoList.findOneAndUpdate({_id:toDoListId},{name:text});
      console.log(todo);
    }
    catch(err){
      console.error("Error Updating List Name", err);
    res.status(500).json({ success: false, message: "Error Updating List Name" });
    }
}

const getAllLists = async (req,res) => {
    const {user_id}=req.body;
    console.log("cgecking",req.body);
    console.log(user_id);
  try {
    
    // console.log("check",JSON.stringify(req.body));
    console.log(typeof(user_id));
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      throw new Error("Invalid user_id");
    }

    const user = await User.findOne({ _id: user_id });
    if (!user) {
      throw new Error("User not found");
    }

    const listPromises = user.todolists.map(async (item) => {
      const itemId =new mongoose.Types.ObjectId(item);
      return ToDoList.findOne({ _id: itemId });
    });

    const lists = await Promise.all(listPromises);
    console.log("Got All Lists Successfully...");
    console.log(lists);
    res.send(lists);
  } catch (error) {
    console.error("Error retrieving lists:", error);
    res.status(500).json({ success: false, message: "Error retrieving lists" });
  }
};


const createToDoList = async (req, res) => {
    try {
      const { name, user_id } = req.body;
  
      const list = await ToDoList.create({
        name: name,
        tasks: [],
        user_id: user_id,
      });
  
      console.log(list);
  
      const user=await User.findOneAndUpdate({ _id: user_id }, { $push: { todolists: list._id } });
    // const user = await User.findOne({_id:user_id});
    //   user.todolists.push(list._id);
    //   user.save();
      console.log(user);
      console.log("Created List Successfully ....");
  
      res.send(list);
    } catch (error) {
      console.log(error);
      res.status(500).send("Failed to create todo list");
    }
  };


  const deleteToDoList = async (req, res) => {
    console.log(req.body);
    try {
      const { toDoListId, user_id } = req.body;
  
      // Remove the list ID from the user's todolists array
      await User.findOneAndUpdate(
        { _id: user_id },
        { $pull: { todolists: toDoListId } }
      );
  
      // Delete the ToDoList document
      const deletedList = await ToDoList.findByIdAndDelete(toDoListId);
  
      console.log("Deleted List Successfully ....");
  
      res.send(deletedList);
    } catch (error) {
      console.log(error);
      res.status(500).send("Failed to delete todo list");
    }
  };
  
  

module.exports={
    getToDoList,
    getAllLists,
    createToDoList,
    deleteToDoList,
    updateListName
}