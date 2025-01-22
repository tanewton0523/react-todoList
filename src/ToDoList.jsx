import React, { useState } from 'react';

function ToDoList(){

    const [tasks, setTasks] = useState([
        { title: "Eat Breakfast", completed: false },
        { title: "Take a Shower", completed: false },
        { title: "Walk the Dog", completed: false },
    ]);
    const [newTask, setNewTask] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editText, setEditText] = useState("");

    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
          setTasks((t) => [{ title: newTask, completed: false }, ...t]);
          setNewTask("");
        }
    }
      

    function deleteTask(index){
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index){
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index){

        if(index < tasks.length - 1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function toggleComplete(index) {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    }
    
    function startEditing(index) {
        setEditingIndex(index);
        setEditText(tasks[index].title);
    }
    
    function saveEdit(index) {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, title: editText } : task
        );
        setTasks(updatedTasks);
        setEditingIndex(null);
        setEditText("");
    }

    return(
    <div className="to-do-list">
        <h1>To-Do-List</h1>

        <div>
            <input 
                type="text"
                placeholder="Enter a task..."
                value={newTask}
                onChange={handleInputChange}
            />
            <button
                className="add-button"
                onClick={addTask}>
                Add
            </button>
        </div>

        <ol>
            {tasks.map((task, index) => (
                <li key={index}>
                    {editingIndex === index ? (
                        <>
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                            />
                            <button onClick={() => saveEdit(index)}>Save</button>
                        </>
                    ) : (
                        <>
                            <span className={`text ${task.completed ? "completed" : ""}`}>{task.title}
                            </span>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleComplete(index)}
                            />
                            <button
                                className="delete-button"
                                onClick={() => deleteTask(index)}
                            >
                                Delete
                            </button>
                            <button
                                className="move-button"
                                onClick={() => moveTaskUp(index)}
                            >
                                UP
                            </button>
                            <button
                                className="down-button"
                                onClick={() => moveTaskDown(index)}
                            >
                                DOWN
                            </button>
                            <button onClick={() => startEditing(index)}>Edit</button>
                        </>
                    )}
                </li>
            ))}            
        </ol>
    </div>
);
}
export default ToDoList