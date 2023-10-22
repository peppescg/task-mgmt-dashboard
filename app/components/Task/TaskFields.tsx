import { TextField, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormikProps } from "formik";
import { Task } from "@/lib/redux";
import dayjs from "dayjs";

export const TaskFields = ({
  errors,
  values,
  handleChange,
  setFieldValue,
  isSubmitting,
}: FormikProps<Task>) => (
  <>
    <Stack spacing={2}>
      <TextField
        id="task-title-field"
        label="Title of the task"
        name="title"
        error={!!errors.title}
        onChange={handleChange}
        helperText={errors.title}
        disabled={isSubmitting}
        variant="outlined"
        value={values.title}
        InputLabelProps={{ shrink: true }}
        inputProps={{
          "data-testid": "task-title-field",
        }}
      />

      <TextField
        id="task-description-field"
        label="Description"
        multiline
        onChange={handleChange}
        rows={4}
        disabled={isSubmitting}
        fullWidth
        name="description"
        value={values.description}
        inputProps={{
          "data-testid": "task-description-field",
        }}
      />
      <DatePicker
        label="Due date"
        disabled={isSubmitting}
        value={dayjs(values.dueDate)}
        onChange={(date) => {
          if (date) {
            setFieldValue("dueDate", date.valueOf(), true);
          }
        }}
      />
    </Stack>
  </>
);
