"use client";

import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import TextField from "@mui/material/TextField";
import SortIcon from "@mui/icons-material/Sort";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { useFilter } from "@/app/hooks/useFilter";
import { IconButton, InputAdornment, Tooltip } from "@mui/material";
import { useCallback } from "react";

export const ToolbarFilter = () => {
  const { pinned, todo, sortByAsc, done, search, setFilter } = useFilter();

  const handleClearSearch = useCallback(() => {
    setFilter((pre) => ({ ...pre, search: "" }));
  }, []);

  return (
    <Stack direction="row" spacing={4} width="80%" alignItems="center">
      <TextField
        id="filled-basic"
        label="Search by title..."
        variant="filled"
        fullWidth
        value={search}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="button"
                disabled={!search}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearSearch();
                }}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
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
            color: "common.white",
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
            color: "common.white",
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
