"use client";

import { Task } from "@/lib/redux";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TaskForm } from "../components/Task/TaskForm";
import { Spinner } from "../components/Spinner";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import { useTask } from "../hooks/useTask";
import Link from "next/link";

export default function EditPage() {
  const { task, getTaskById, remove, edit, status } = useTask();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) getTaskById(id);
  }, [id]);

  const onHandleSubmit = (data: Task) => {
    edit(data);
  };

  const onHandleSecondaryBtn = (id: string) => {
    remove(id);
    router.push("/");
  };

  if (status === "loading") return <Spinner />;
  if (!task) return null;

  return (
    <Box width="50%">
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          HOME
        </Link>

        <Typography color="text.primary">{task.title}</Typography>
      </Breadcrumbs>

      <Typography
        variant="h4"
        component="div"
        py={3}
        gap={1}
        display="flex"
        alignContent="center"
      >
        <ModeEditIcon fontSize="large" />
        Edit {task?.title} task
      </Typography>

      {task && (
        <TaskForm
          {...task}
          status={status}
          onSubmit={onHandleSubmit}
          onHandleSecondaryBtn={onHandleSecondaryBtn}
        />
      )}
    </Box>
  );
}
