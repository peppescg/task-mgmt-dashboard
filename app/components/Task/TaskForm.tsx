"use client";
import { Box, Divider, styled } from "@mui/material";
import Button from "@mui/material/Button";
import { Formik, FormikProps } from "formik";
import { Task } from "@/lib/redux";
import LoadingButton from "@mui/lab/LoadingButton";
import { TaskFields } from "./TaskFields";
import { Actions } from "./Actions";
import dayjs from "dayjs";

const ActionsBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const Form = styled("form")`
  width: 100%;
`;

interface TaskProps extends Omit<Task, "title"> {
  title?: string;
  status: string;
  onSubmit: (task: Task) => void;
  onHandleSecondaryBtn: (taskId: string) => void;
}

export const TaskForm = ({
  title = "",
  description,
  dueDate = dayjs().valueOf(),
  id,
  pinned,
  done,
  status,
  onSubmit,
  onHandleSecondaryBtn,
}: TaskProps) => {
  const isSubmitting = status === "editing";
  return (
    <Formik
      initialValues={{ id, title, description, dueDate, pinned, done }}
      validateOnChange={false}
      validateOnBlur={false}
      validate={(values) => {
        if (values.title) return {};
        return { title: "Field required" };
      }}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {(formikProps: FormikProps<Task>) => (
        <Form onSubmit={formikProps.handleSubmit}>
          <TaskFields {...formikProps} isSubmitting={isSubmitting} />
          <Divider variant="fullWidth" light sx={{ my: 4 }} />
          <ActionsBox>
            <Box>
              <Actions
                pinned={formikProps.values.pinned ?? false}
                done={formikProps.values.done ?? false}
                setPinned={(isPinned) => {
                  formikProps.setFieldValue("pinned", isPinned);
                }}
                setDone={(isDone) => {
                  formikProps.setFieldValue("done", isDone);
                }}
              />
            </Box>

            <Box gap={2} display="flex">
              <LoadingButton
                size="small"
                id="submit"
                loading={isSubmitting}
                variant="contained"
                type="submit"
                data-testid="submit"
              >
                {id ? "Edit task" : "Create task"}
              </LoadingButton>
              {id && (
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => onHandleSecondaryBtn(id)}
                >
                  Delete
                </Button>
              )}
            </Box>
          </ActionsBox>
        </Form>
      )}
    </Formik>
  );
};
