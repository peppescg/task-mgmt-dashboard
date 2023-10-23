"use client";
import {
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import Card from "@mui/material/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { Task } from "@/lib/redux";
import { Actions } from "./Actions";

interface TaskProps extends Task {
  dueDate?: string | number | undefined;
  onHandleDelete: (id: string) => void;
  onHandleDone: (done: boolean) => void;
  onHandlePin: (pinned: boolean) => void;
}

const CardContentOverride = styled(CardContent)(`
display: flex;
flex-direction: column;
justify-content: space-between;
height: 100%;
  &:last-child {
    padding-bottom: 16px;
  }
`);

const CardActionsOverride = styled(CardActions)`
  padding: 0;
`;

const getChipColor = (
  done: boolean | undefined,
  pinned: boolean | undefined
) => {
  if (done) return "success";
  if (pinned) return "primary";
  return 'default'
};

export const TaskPreview = ({
  title = "Title",
  id,
  done,
  pinned,
  description,
  dueDate,
  onHandleDelete,
  onHandleDone,
  onHandlePin,
}: TaskProps) => {
  return (
    <Card
      sx={{
        "&:hover": {
          border: "1px solid #dadada",
          opacity: 1,
        },
        cursor: "pointer",
        minWidth: 200,
        height: 125,
        ...{
          opacity: 1,
          border: "1px solid #f3f3f3",
        },
        ...(done && {
          opacity: 0.7,
          border: (theme) => `1px solid ${theme.palette.success.light}`,
        }),
      }}
    >
      <CardContentOverride>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            fontSize="large"
            color="text.primary"
            data-testid="task-title"
          >
            <Chip label={title} color={getChipColor(done, pinned)} />
          </Typography>
          <CardActionsOverride disableSpacing>
            <Actions
              pinned={pinned ?? false}
              done={done ?? false}
              setPinned={(isPinned) => {
                onHandlePin(isPinned);
              }}
              setDone={(isDone) => onHandleDone(isDone)}
            />

            <Tooltip title="Delete">
              <IconButton
                data-testid="delete-task"
                sx={{
                  "&:hover": { color: (theme) => theme.palette.error.main },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (id) onHandleDelete(id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </CardActionsOverride>
        </Box>

        <Box py={1}>
          <Typography fontSize="small" noWrap>
            {description}
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="flex-end"
          justifyContent="space-between"
          width={95}
          height={20}
        >
          <CalendarMonthIcon color="primary" fontSize="small" />
          <Typography fontSize="small" color="text.secondary">
            {dayjs(dueDate).format("MM/DD/YYYY")}
          </Typography>
        </Box>
      </CardContentOverride>
    </Card>
  );
};
