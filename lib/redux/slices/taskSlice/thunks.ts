import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk";
import type { Task, TaskFilter } from "@/lib/redux";
import { create, get, getById, remove, update } from "@/app/api/task/service";

export const getTasks = createAppAsyncThunk(
  "task/get",
  async (filter?: TaskFilter| undefined) => {
    const response = await get(filter);

    return response.data;
  }
);

export const getTaskById = createAppAsyncThunk(
  "task/getTaskById",
  async (id: string) => {
    const response = await getById(id);

    return response.data;
  }
);

export const addTask = createAppAsyncThunk("task/add", async (task: Task) => {
  const response = await create(task);

  return response.data;
});

export const deleteTask = createAppAsyncThunk(
  "task/delete",
  async (taskId: string) => {
    const response = await remove(taskId);

    return response.data;
  }
);

export const editTask = createAppAsyncThunk("task/edit", async (task: Task) => {
  const response = await update(task);

  return response.data;
});
