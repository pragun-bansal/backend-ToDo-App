import ToDoList from "../../models/ToDoList";

const getList=async(_id)=>{
    const list=[];
    const todo = await ToDoList.findById(_id)
    .then(()=>{
        {
            todo.tasks.map((task)=>{
                const tas = TasksModel.findById(task);
                list.push(tas);
            })
            return tas;
        }
    })
}

module.exports={
    getList
  }