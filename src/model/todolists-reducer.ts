import type { FilterValues, Todolist } from "../app/App";
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

export const deleteTodolistAC = createAction<{ id: string }>(
  "todolists/deleteTodolist"
);

export const createTodolistAC = createAction(
  "todolists/createTodolist",
  (title: string) => {
    return { payload: { title, id: nanoid } };
  }
);

export const changeTodolistTitleAC = createAction<{
  id: string;
  title: string;
}>("todolists/changeTodolistTitle");

export const changeTodolistFilterAC = createAction<{
  id: string;
  filter: FilterValues;
}>("todolists/changeTodolistFilter");

const initialState: Todolist[] = [];

export const todolistsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteTodolistAC, (state, action) => {
      const index = state.findIndex(
        (todlist) => todlist.id === action.payload.id
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    })
    .addCase(createTodolistAC, (state, action) => {
      state.push({ ...action.payload, filter: "all" });
    })
    .addCase(changeTodolistTitleAC, (state, action) => {
      const index = state.findIndex(
        (todlist) => todlist.id === action.payload.id
      );
      if (index !== -1) {
        state[index].title = action.payload.title;
      }
    })
    .addCase(changeTodolistFilterAC, (state, action) => {
      const todolist = state.find((todlist) => todlist.id === action.payload.id);
      if (todolist) {
        todolist.filter = action.payload.filter;
      }
    });
});

export const deleteTodolistAC2 = (id: string) => {
  return { type: "delete_todolist", payload: { id } } as const;
};

export const createTodolistAC2 = (title: string) => {
  return { type: "create_todolist", payload: { title, id: v1() } } as const;
};

export const changeTodolistTitleAC2 = (payload: {
  id: string;
  title: string;
}) => {
  return { type: "change_todolist_title", payload } as const;
};

export const changeTodolistFilterAC2 = (payload: {
  id: string;
  filter: FilterValues;
}) => {
  return { type: "change_todolist_filter", payload } as const;
};
