"use client";

import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import TextField from "@mui/material/TextField";
import SortIcon from "@mui/icons-material/Sort";
import { useFilter } from "@/app/hooks/useFilter";
import { Tooltip } from "@mui/material";

export const ToolbarTask = () => {
  const { pinned, todo, sortByAsc, done, setFilter } = useFilter();

  return (
    <Stack direction="row" spacing={4} width="80%" alignItems="center">
      <TextField
        id="filled-basic"
        label="Search by title..."
        variant="filled"
        fullWidth
        onChange={(e) =>
          setFilter((pre) => ({ ...pre, search: e.target.value ?? "" }))
        }
      />

      <ToggleButton
        value="check"
        data-testid="todo-toggle"
        selected={todo}
        onChange={() => setFilter((pre) => ({ ...pre, todo: !todo }))}
      >
        TODO
      </ToggleButton>
      <ToggleButton
        value="check"
        color="success"
        data-testid="done-toggle"
        selected={done}
        sx={{
          "&:hover": {
            background: (theme) => theme.palette.success.main,
            color: "#fff",
          },
        }}
        onChange={() => setFilter((pre) => ({ ...pre, done: !done }))}
      >
        DONE
      </ToggleButton>
      <ToggleButton
        value="check"
        selected={pinned}
        data-testid="pinned-toggle"
        color="primary"
        sx={{
          "&:hover": {
            color: "#fff",
            background: (theme) => theme.palette.primary.main,
          },
        }}
        onChange={() => setFilter((pre) => ({ ...pre, pinned: !pinned }))}
      >
        PINNED
      </ToggleButton>

      <Tooltip title="Sort by due date asc/desc">
        <ToggleButton
          value="sort"
          data-testid="sort-toggle"
          aria-label="sort"
          onClick={() =>
            setFilter((pre) => ({ ...pre, sortByAsc: !sortByAsc }))
          }
        >
          <SortIcon />
        </ToggleButton>
      </Tooltip>
    </Stack>
  );
};
