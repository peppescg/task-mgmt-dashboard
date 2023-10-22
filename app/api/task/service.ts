import { nanoid } from "@reduxjs/toolkit";
import { LocalStorage } from "./LocalStorage";
import { Task, TaskFilter } from "@/lib/redux";

const LOCAL_STORAGE_KEY = "task-dashboard";

export const get = async (filter?: TaskFilter): Promise<{ data: Task[] }> => {
  const { get } = LocalStorage("task-dashboard");
  const currentTasks: Task[] = get();

  const data = filter
    ? currentTasks
        .filter((item) =>
          filter?.search
            ? item.title.toLowerCase().includes(filter.search.toLowerCase())
            : true
        )
        .filter((item) => (filter.done ? item.done : true))
        .filter((item) => (filter.todo ? !item.done : true))
        .filter((item) => (filter.pinned ? item.pinned : true))
        .sort((a, b) => {
          if (a.dueDate && b.dueDate) {
            return filter.sortByAsc
              ? +new Date(a.dueDate) - +new Date(b.dueDate)
              : +new Date(b.dueDate) - +new Date(a.dueDate);
          }
          return 0;
        })
    : currentTasks;

  return new Promise(function (resolve) {
    setTimeout(
      () =>
        resolve({
          data,
        }),
      500
    );
  });
};

export const getById = async (
  id: string
): Promise<{ data: Task | undefined }> => {
  const { get } = LocalStorage("task-dashboard");
  const currentTasks: Task[] = get();

  return new Promise(function (resolve) {
    setTimeout(
      () =>
        resolve({
          data: currentTasks.find((item) => item.id === id),
        }),
      500
    );
  });
};

export const create = async (task: Task): Promise<{ data: Task }> => {
  const { get, set } = LocalStorage(LOCAL_STORAGE_KEY);
  const currentTasks: Task[] = get();
  const enrichData: Task = {
    ...task,
    id: nanoid(),
    createdAt: +new Date(),
    updatedAt: +new Date(),
  };

  const data = currentTasks.length
    ? [...currentTasks, enrichData]
    : [enrichData];

  set(data);

  return new Promise(function (resolve) {
    setTimeout(() => resolve({ data: enrichData }), 500);
  });
};

export const remove = async (
  taskId: string
): Promise<{ data: { id: string } }> => {
  const { get, set } = LocalStorage(LOCAL_STORAGE_KEY);
  const currentTasks: Task[] = get();

  set(currentTasks.filter((item) => item.id !== taskId));

  return new Promise(function (resolve) {
    setTimeout(() => resolve({ data: { id: taskId } }), 500);
  });
};

export const update = async (task: Task): Promise<{ data: Task }> => {
  const { get, set } = LocalStorage(LOCAL_STORAGE_KEY);
  const currentTasks: Task[] = get();

  const enrichData: Task = {
    ...task,
    updatedAt: +new Date(),
  };

  const data = currentTasks.map((item) =>
    item.id === enrichData.id ? enrichData : item
  );

  set(data);

  return new Promise(function (resolve) {
    setTimeout(() => resolve({ data: enrichData }), 500);
  });
};
