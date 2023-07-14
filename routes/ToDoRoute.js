const {Router} = require("express");
const { getToDoList, getAllLists, createToDoList,deleteToDoList, updateListName } = require("../controllers/ToDoListController");
const { saveTask, updateTask,deleteTask,toggleCheckTask, } = require("../controllers/ToDoController");
const { verifyUser } = require("../lib/utils");

const router = Router()

router.post("/getToDoList",verifyUser, getToDoList)
router.post("/saveTAsk",verifyUser,saveTask)
router.post("/updateTask",verifyUser,updateTask)
router.post("/deleteTAsk",verifyUser,deleteTask)
router.put("/toggleCheckTask",verifyUser,toggleCheckTask)
router.post("/getAllLists",verifyUser, getAllLists)
router.post("/createToDoList",verifyUser, createToDoList)
router.post("/deleteToDoList",verifyUser, deleteToDoList)
router.post("/updateListName",verifyUser, updateListName)
router.get("/example", (req, res) => {
    // Access the session data
    const sessionData = req.session;
    
    // Access specific values from the session
    const user = req.session.user;
    const username = req.session.username;
    
    // Do something with the session data
    // ...
    
    res.send({
        user
    });
  });
module.exports = router;