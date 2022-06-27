import React, { useEffect, useState } from "react";
import styles from "../styles/TodoModal.module.css";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addTodo, editTodo } from "../app/slices/todoSlice";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.05,
      type: "spring",
      damping: 15,
      stiffness: 600,
    },
  },
  exit: {
    transform: "scale(0.90)",
    opacity: 0,
  },
};

const TodoModal = ({ type, modalOpen, setModalOpen, todo }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");

  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "edit" && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle("");
      setStatus("incomplete");
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please enter a title");
      return;
    }

    if (title && status) {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success("Task Added Succesfully");
        setTitle("");
      }
      if (type === "edit") {
        if (todo.title !== title || todo.status !== status) {
          dispatch(
            editTodo({
              ...todo,
              title,
              status,
            })
          );
          toast.success("Task Edited Succesfully");
          setTitle("");
          
        } else {
          toast.error("No changes made");
          return;
        }
      }
      setModalOpen(false);
    }
  };
  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onClick={() => setModalOpen(false)}
              onKeyDown={() => setModalOpen(false)}
              tabIndex={0}
              role="button"
              initial={{top: 1, opacity: 0}}
              animate={{top: -10, opacity: 1}}
              exit={{top: 10, opacity: 0}}
            >
              <MdOutlineClose />
            </motion.div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <h1> {type === "edit" ? "Edit" : "Add"} Task</h1>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="status">
                Status
                <select
                  name="status"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Complete</option>
                </select>
              </label>
              <div>
                <Button type="submit" variant="primary">
                  {type === "edit" ? "Edit" : "Add"} Task
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setModalOpen(false)}
                  onKeyDown={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TodoModal;