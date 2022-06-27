import React, { useEffect, useState } from "react";
import { getClasses } from "../utils/getClasses";
import styles from "../styles/TodoItem.module.css";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo } from "../app/slices/todoSlice";
import toast from "react-hot-toast";
import TodoModal from "./TodoModal";
import Checkbox from "./Checkbox";
import { motion } from "framer-motion";

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    if (todo.status === "complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Todo Deleted Successfully");
  };

  const handleEdit = () => {
    setUpdateModalOpen(true);
  };

  const handleCheck = () => {
    setChecked(!checked)
    dispatch(
      editTodo({
        ...todo,
        status: checked ? "incomplete" : "complete",
      })
    );
  };

  return (
    <>
      <motion.div variants={child}>
        <div>
          <Checkbox checked={checked} handleCheck={handleCheck} />
          <div>
            <p
              className={getClasses([
                styles.todoText,
                todo.status === "complete" && styles["todoText--completed"],
              ])}
            >
              {todo.title}
            </p>
            <p>{todo.time}</p>
          </div>
        </div>
        <div>
          <div
            onClick={handleDelete}
            onKeyDown={handleDelete}
            role="button"
            tabIndex={0}
          >
            <MdDelete />
          </div>
          <div
            onClick={handleEdit}
            onKeyDown={handleEdit}
            role="button"
            tabIndex={0}
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>

      <TodoModal
        type="edit"
        todo={todo}
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
      />
    </>
  );
};

export default TodoItem;
