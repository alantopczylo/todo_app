import { createSlice } from "@reduxjs/toolkit";

const getInitialTodo = () => {
  const localTodoList = window.localStorage.getItem("todoList");
  if (localTodoList) {
    return JSON.parse(localTodoList);
  } else {
    window.localStorage.setItem("todoList", JSON.stringify([]));
    return [];
  }
};

const initialValue = {
  filterStatus: 'all',
  todoList: getInitialTodo(),
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);

      //Sacamos nuestra todoList del local storage
      const todoList = window.localStorage.getItem("todoList");

      if (todoList) {
        //si existe una todo list en el local storage
        const todoListArr = JSON.parse(todoList); //creamos un array de esas todo list

        todoListArr.push({
          //pusheamos nuestra nueva todo al array
          ...action.payload,
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr)); //agregamos la todo al localstorage
      } else {
        window.localStorage.setItem(
          "todoList",
          JSON.stringify([{ ...action.payload }])
        );
      }
    },
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");

      if (todoList) {
        const todoListArr = JSON.parse(todoList);

        // todoListArr.forEach((todo, index) => {
        //   if (todo.id === action.payload) {
        //     todoListArr.splice(index, 1);
        //   }
        // });

        const data = todoListArr.filter((todo) => todo.id !== action.payload);
        window.localStorage.setItem("todoList", JSON.stringify(data));
        state.todoList = data;
      }
    },
    editTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");

      if (todoList) {
        const todoListArr = JSON.parse(todoList);

        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload.id) {
            todo.title = action.payload.title;
            todo.status = action.payload.status;
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    }
  },
});

export const { addTodo, deleteTodo, editTodo, updateFilterStatus } = todoSlice.actions;
export default todoSlice.reducer;
