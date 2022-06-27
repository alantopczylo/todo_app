import React, { useState } from "react";
import Button, { SelectButton } from "./Button";
import styles from "../styles/Header.module.css";
import TodoModal from "./TodoModal";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterStatus } from "../app/slices/todoSlice";

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const filterStatus = useSelector(state => state.todo.filterStatus)
  const dispatch = useDispatch()

  const updateFilter = (e) => {
    dispatch(updateFilterStatus(e.target.value));
  }

  return (
    <div className={styles.header}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>Add Task</Button>
      <SelectButton id="status" value={filterStatus} onChange={updateFilter}>
        <option value="all">All</option>
        <option value="incomplete">Incompleted</option>
        <option value="complete">Completed</option>
      </SelectButton>
      <TodoModal type='add' modalOpen={modalOpen} setModalOpen={setModalOpen}/>
    </div>
  );
};

export default Header;
