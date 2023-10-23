"use client";

// /* Core */
import { useState } from "react";

// /* Instruments */
import { Task } from "@/lib/redux";
import { Divider, Grid } from "@mui/material";
import { TaskList } from "./Task/TaskList";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Button from "@mui/material/Button";
import { ToolbarFilter } from "./Task/ToolbarFilter";
import { Modal } from "./Modal";
import { TaskForm } from "./Task/TaskForm";
import styled from "@emotion/styled";
import { useTask } from "../hooks/useTask";

const DashboardWrapper = styled("div")`
  position: relative;
  width: 100%;
`;

export const Dashboard = () => {
  const { add, status } = useTask();
  const [open, setOpen] = useState(false);

  return (
    <DashboardWrapper>
      <Modal setOpen={setOpen} isOpen={open} title="Create a task">
        <TaskForm
          status={status}
          onHandleSecondaryBtn={() => setOpen(false)}
          onSubmit={(task: Task) => {
            setOpen(false);
            add(task);
          }}
        />
      </Modal>
      <Grid container px={4} gap={2}>
        <Grid item container direction="row" justifyContent="space-between">
          <Button
            size="large"
            variant="contained"
            onClick={() => setOpen(true)}
            endIcon={<PlaylistAddIcon fontSize="large" />}
          >
            ADD TASK
          </Button>
          <ToolbarFilter />
        </Grid>
        <Divider variant="fullWidth" sx={{ my: 2, width: "100%" }} />
        <TaskList />
      </Grid>
    </DashboardWrapper>
  );
};
