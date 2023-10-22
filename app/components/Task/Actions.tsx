"use client";
import { IconButton, Tooltip } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface ActionsProps {
  pinned: boolean;
  done: boolean;
  setPinned: (pinned: boolean) => void;
  setDone: (done: boolean) => void;
}
export const Actions = ({ done, pinned, setDone, setPinned }: ActionsProps) => {
  return (
    <>
      <Tooltip title="Pin">
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setPinned(!pinned);
          }}
          sx={{
            "&:hover": { color: (theme) => theme.palette.primary.main },
            ...(pinned && {
              color: (theme) => theme.palette.primary.main,
            }),
          }}
        >
          <PushPinIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Done">
        <IconButton
          data-testid="done-task"
          sx={{
            "&:hover": { color: (theme) => theme.palette.success.main },
            ...(done && {
              color: (theme) => theme.palette.success.main,
            }),
          }}
          onClick={(e) => {
            e.stopPropagation();
            setDone(!done);
          }}
        >
          <CheckCircleIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};
