
// App.js
import '../App.css';

import { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import Todo from "./Todo";
import { db, serverTimestamp } from "../db"; 
import { collection, onSnapshot, query, orderBy, addDoc } from "firebase/firestore";

import { doc, updateDoc} from "firebase/firestore";

import "../Todo.css";


function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [todoEdit, setTodoEdit] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map((document) => ({
        id: document.id,
        item: document.data()
      })));
    });

    return () => unsubscribe();
  }, []); 

  const addTodo = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "todos"), {
        todo: input,
        timestamp: serverTimestamp(),
      });
      setInput("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleOpenEdit = (todoItem) => {
    setTodoEdit(todoItem);
    setOpen(true);
  };

  const handleCloseEdit = () => {
    setOpen(false);
    setTodoEdit(null);
  };

  const editOnClick = async () => {
    try {
      const todoRef = doc(db, "todos", todoEdit.id);

      await updateDoc(todoRef, {
        todo: todoEdit.item.todo,
        timestamp: serverTimestamp(),
      });
      handleCloseEdit();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  console.log(todos);
  return (
    <div className="App">
      <h1>TODO React Firebase</h1>

      <form>
          <FormControl>
            <InputLabel>Write a TODO</InputLabel>
            <Input value={input} onChange={e => setInput(e.target.value)} />
          </FormControl>
          <Button
            type="submit"
            onClick={addTodo}
            variant="contained"
            color="primary"
            disabled={!input}
            >
              Add Todo
            </Button>
      </form>
      <ul>
        {
          todos.map(it => <Todo key={it.id} arr={it} onEditClick={handleOpenEdit} />)
        }
      </ul>

      {
        open && todoEdit && (
          <div className="edit__modal">
            <h2>Edit Todo</h2>
            <input 
              type="text"
              value={todoEdit.item.todo}
              onChange={(e) => setTodoEdit({
                ...todoEdit,
                item: { ...todoEdit.item, todo: e.target.value }
              })}
            />
            <button onClick={editOnClick}>Save</button>
            <button onClick={handleCloseEdit}>Cancel</button>
          </div>
        )
      }
    </div>
  );
}

export default App;
