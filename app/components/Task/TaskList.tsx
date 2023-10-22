"use client";

import { Box, Grid, Typography } from "@mui/material";
import { TaskPreview } from "./TaskPreview";
import { useRouter } from "next/navigation";
import TaskIcon from "@mui/icons-material/Task";
import { Task } from "@/lib/redux";
import { useEffect } from "react";
import { Spinner } from "../Spinner";
import { useTask } from "@/app/hooks/useTask";

const styles = {
  largeIcon: {
    width: 60,
    height: 60,
  },
};

const EmptyTasks = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      gap={4}
      color="text.secondary"
      position="relative"
    >
      <TaskIcon style={styles.largeIcon} />
      <Typography variant="h2" component="h3">
        Please add a task
      </Typography>
    </Box>
  );
};

export const TaskList = () => {
  const { getTasks, remove, edit, status, list } = useTask();
  const router = useRouter();

  useEffect(() => {
    getTasks();
  }, []);

  const onHandleDelete = (id: string) => {
    remove(id);
  };

  const onHandleEdit = (task: Task) => edit(task);

  if (status === "loading" || status === "editing") return <Spinner />;
  // if (!list.length) return <EmptyTasks />;

  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={2}
      justifyContent="flex-start"
      alignItems="center"
    >
      {list.map((task) => {
        return (
          <Grid
            item
            xs={3}
            key={task.id}
            onClick={() => router.push(`/edit?id=${task.id}`)}
          >
            <TaskPreview
              {...task}
              onHandlePin={(pinned) => onHandleEdit({ ...task, pinned })}
              onHandleDone={(done) => onHandleEdit({ ...task, done })}
              onHandleDelete={onHandleDelete}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
