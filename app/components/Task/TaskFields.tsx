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
}: FormikProps<Task>) => {
  return (
    <>
      <Stack spacing={2}>
        <TextField
          id="outlined-basic"
          label="Title of the task"
          name="title"
          error={!!errors.title}
          onChange={handleChange}
          helperText={errors.title}
          disabled={isSubmitting}
          variant="outlined"
          value={values.title}
        />

        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          onChange={handleChange}
          rows={4}
          disabled={isSubmitting}
          fullWidth
          name="description"
          value={values.description}
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
          // slotProps={{
          //   textField: {
          //     helperText: "cioane",
          //   },
          // }}
        />
      </Stack>
    </>
  );
};
