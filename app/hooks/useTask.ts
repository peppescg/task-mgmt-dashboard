"use client";

import {
  selectTask,
  getTasks,
  editTask,
  useSelector,
  useDispatch,
  Task,
  deleteTask,
  addTask,
  getTaskById,
  TaskFilter,
} from "@/lib/redux";

export const useTask = () => {
  const dispatch = useDispatch();
  const { list, task, status } = useSelector(selectTask);

  const onHandleGetTasks = (filter?: TaskFilter| undefined) => dispatch(getTasks(filter));

  const onHandleEdit = (data: Task) => dispatch(editTask(data));

  const onHandleDelete = (id: string) => dispatch(deleteTask(id));

  const onHandleAdd = (data: Task) => dispatch(addTask(data));

  const onHandleGetTaskById = (id: string) => {
    dispatch(getTaskById(id));
  };

  return {
    status,
    task,
    list,
    edit: onHandleEdit,
    add: onHandleAdd,
    remove: onHandleDelete,
    getTaskById: onHandleGetTaskById,
    getTasks: onHandleGetTasks,
  };
};
