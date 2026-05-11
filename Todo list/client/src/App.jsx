import { useEffect, useState } from "react"
import axios from 'axios'
import { MdOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash} from "react-icons/fa6";
import { IoClipboardOutline } from "react-icons/io5";


function App() {

  const[newTodo, setNewTodo] = useState('');
  const[todos, setTodos] = useState([]);
  const[editTodo, setEditTodo] = useState(null);
  const[editedText, setEditedText] = useState('');

  const addTodo = async (e)=>{
    e.preventDefault();
    if(!newTodo.trim()) return;
    try{
      const response = await axios.post("/api/todos", {text: newTodo});
      setTodos([...todos, response.data]);
      setNewTodo('');
    }
    catch(err){
      console.log('error adding todo' ,err)
    }
  }


  const fetchTodos = async ()=>{
    try{
      const response = await axios.get('/api/todos');
      setTodos(response.data);
      
      
    }
    catch(err){
      console.log('error fetching todos', err);
      
    }
  }


  const startEditing = (todo)=>{
    setEditTodo(todo._id);
    setEditedText(todo.text);
  }

  const saveEdit = async (id)=>{
    try{
      const responce = await axios.patch(`/api/todos/${id}`, {
        text: editedText,
      });
      setTodos(todos.map((todo)=>(todo._id === id ? responce.data : todo)));
      setEditTodo(null);
    }
    catch(err){
      console.log('error updating todo', err);
      
    }

  }

  const deleteTodo = async (id)=>{
    try{
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((todo)=> todo._id !== id))
      
    }
    catch(err){
      console.log('error in deleting', err);
      
    }
  }

  const toggleTodo = async (id)=>{
    try{
      const todo = todos.find((t)=> t._id === id);
      const responce =  await axios.patch(`/api/todos/${id}`, {
        completed: !todo.completed
      });
      setTodos(todos.map((todo)=>(todo._id === id ? responce.data : todo)))
    }
    catch(err){
      console.log('error in complete toggle', err);
      
    }

  }
  

  useEffect(()=>{
    fetchTodos();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Task Manager</h1>
          <form onSubmit={addTodo}
          className="flex item-center gap-2 shadow-sm border border-gray-200 p-2 rounded-lg">
          <input type="text"
          className="outline-none px-3 py-2 text-gray-700 placeholder-gray-400 flex-1"
          value={newTodo}
          onChange={(e)=>setNewTodo(e.target.value)} 
          placeholder="What needs to be done?"
          required/>
          <button type='submit'
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer">Add task</button>
        </form>
        <div className="mt-4">
          {todos.length === 0 ?(
            <div>No tasks</div>
          ): (
            <div className="flex flex-col gap-4">
              {todos.map((todo)=>(
                <div key={todo._id}>
                  {editTodo === todo._id ?(
                    <div className="flex items-center gap-x-3">
                      <input type="text"
                      className="border p-3 border-gray-200 flex-1 rounded-lg outline-none
                      focus:ring-2 focus:ring-blue-300 text-gray-700 shadow-inner"
                      value={editedText}
                      onChange={(e)=>{setEditedText(e.target.value)}} />
                      <div className="flex gap-x-2">
                        <button onClick={()=>{saveEdit(todo._id)}}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"><MdOutlineDone/></button>
                        <button onClick={()=>{setEditTodo(null)}}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer"><IoClose/></button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-x-4 items-center overflow-hidden">
                          <button onClick={()=>{toggleTodo(todo._id)}}
                          className={`flex-shrink-0 h-6 w-6 border rounded-full flex items-center justify-center ${todo.completed ? 
                            "bg-green-500 border-green-500" : "border-gray-300 hover:border-blue-400"}` } 
                            >{todo.completed && <MdOutlineDone/>}</button>
                          <span className="text-gray-800 font-medium truncate">{todo.text}</span>
                        </div>
                        <div className="flex gap-x-2">
                          <button onClick={()=>{startEditing(todo)}}
                            className="p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 duration-200"><MdModeEditOutline/></button>
                          <button className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 duration-200"
                          onClick={()=>{deleteTodo(todo._id)}}><FaTrash/></button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  )
}

export default App
