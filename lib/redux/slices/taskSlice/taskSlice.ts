/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addTask, editTask, deleteTask, getTasks, getTaskById } from "./thunks";

const initialState: TaskSliceState = {
  list: [],
  status: "idle",
  task: undefined,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload;
      })
      .addCase(getTaskById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.status = "idle";
        state.task = action.payload;
      })
      .addCase(addTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = [...state.list, action.payload];
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = state.list.filter((task) => task.id !== action.payload.id);
      })
      .addCase(editTask.pending, (state) => {
        state.status = "editing";
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = state.list.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      });
  },
});

/* Types */
export interface Task {
  id?: string;
  title: string;
  description?: string;
  done?: boolean;
  pinned?: boolean;
  dueDate?: string | number;
  //timestamp
  updatedAt?: number;
  //timestamp
  createdAt?: number;
}

export interface TaskSliceState {
  list: Task[];
  task: Task | undefined;
  status: "idle" | "loading" | "editing" | "failed";
}

export interface TaskFilter {
  search?: string;
  todo?: boolean;
  pinned?: boolean;
  done?: boolean;
  sortByAsc?: boolean;
}
