import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useTask } from "./useTask";
import { debounce } from "@mui/material";

export const useFilter = () => {
  const { getTasks } = useTask();
  const [filter, setFilter] = useState({
    done: false,
    todo: false,
    pinned: false,
    search: "",
    sortByAsc: false,
  });

  const handleChange = () => {
    getTasks(filter);
  };

  const onDebouncedResults = useMemo(() => {
    return debounce(handleChange, 300);
  }, [filter]);

  useEffect(() => {
    onDebouncedResults();
  }, [filter]);

  return {
    setFilter,
    ...filter,
  };
};
