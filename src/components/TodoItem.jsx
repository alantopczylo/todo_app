import React, { useEffect, useState } from "react";
import { getClasses } from "../utils/getClasses";
import styles from "../styles/TodoItem.module.css";
// import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo } from "../app/slices/todoSlice";
import TodoModal from "./TodoModal";
import Checkbox from "./Checkbox";
import { motion } from "framer-motion";
import Swal from 'sweetalert2'

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
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#a271cc',
      cancelButtonColor: '#ff1818',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        )
        dispatch(deleteTodo(todo.id));
      }
    })
  };

  const handleEdit = () => {
    setUpdateModalOpen(true);
  };

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      editTodo({
        ...todo,
        status: checked ? "incomplete" : "complete",
      })
    );
  };

  return (
    <>
      <motion.div variants={child} className={styles.container}>
        <div className={styles.top}>
          <div className={styles.checktext}>
            <Checkbox checked={checked} handleCheck={handleCheck} />

            <div className={styles.timetext}>
              <p
                className={getClasses([
                  styles.todoText,
                  todo.status === "complete" && styles["todoText--completed"],
                ])}
              >
                {todo.title}
              </p>
              <p className={styles.time}>{todo.time}</p>
            </div>
          </div>
          
        </div>
        <div className={styles.deleteEdit}>
            
            <div
              onClick={handleEdit}
              onKeyDown={handleEdit}
              role="button"
              tabIndex={0}
              className={styles.buttonEdit}
            >
              <p className={styles.handleSvg}>Edit</p>
            </div>
            
            <div
              onClick={handleDelete}
              onKeyDown={handleDelete}
              role="button"
              tabIndex={0}
              className={styles.buttonDelete}
            >
              <p className={styles.handleSvg}>Delete</p>
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
