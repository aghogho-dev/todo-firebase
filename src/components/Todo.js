import { List, ListItem, ListItemAvatar, ListItemText, Button } from "@mui/material";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { db } from "../db";
import { doc, deleteDoc } from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";

import "../Todo.css";


const Todo = ({ arr, onEditClick }) => {
    const handleDelete = async () => {
        try {
            const todoRef = doc(db, "todos", arr.id);
            await deleteDoc(todoRef);
            console.log("Document successfully deleted!");
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    }
    return (
        <List className="todo__list">
            <ListItem>
                <ListItemAvatar />
                <ListItemText 
                primary={arr.item.todo} 
                secondary={arr.item.todo} 
                />
                {/* <DeleteForeverIcon 
                    onClick={handleDelete}
                    fontSize="large"
                /> */}

                <Button
                variant="contained"
                color="primary"
                onClick={() => onEditClick(arr)}
                style={{ marginLeft: "10px" }}
            >
                <EditIcon fontSize="small" />
            </Button>

            <Button
                variant="contained"
                color="secondary"
                onClick={handleDelete}
                style={{ marginLeft: "10px" }}
            >
                <DeleteForeverIcon fontSize="small" width={5}/>
            </Button>
            </ListItem>

            
            
        </List>
    )
};

export default Todo;