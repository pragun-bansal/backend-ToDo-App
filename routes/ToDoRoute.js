const {Router} = require("express");
const { getToDoList, getAllLists, createToDoList,deleteToDoList, updateListName } = require("../controllers/ToDoListController");
const { saveTask, updateTask,deleteTask,toggleCheckTask, } = require("../controllers/ToDoController");

const router = Router()

router.post("/getToDoList", getToDoList)
router.post("/saveTAsk",saveTask)
router.post("/updateTask",updateTask)
router.post("/deleteTAsk",deleteTask)
router.put("/toggleCheckTask",toggleCheckTask)
router.post("/getAllLists", getAllLists)
router.post("/createToDoList", createToDoList)
router.post("/deleteToDoList", deleteToDoList)
router.put("/updateListName", updateListName)
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