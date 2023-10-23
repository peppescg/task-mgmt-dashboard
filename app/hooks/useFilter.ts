import { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTask } from "./useTask";

type FilterProps = {
  done: boolean;
  todo: boolean;
  pinned: boolean;
  sortByAsc: boolean;
  search: string;
};

export const useFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const todo = searchParams.has("todo") ?? false;
  const pinned = searchParams.has("pinned") ?? false;
  const done = searchParams.has("done") ?? false;
  const sortByAsc = searchParams.has("sortByAsc") ?? false;
  const pathname = usePathname();
  const { getTasks } = useTask();
  const [filter, setFilter] = useState<FilterProps>({
    done,
    todo,
    pinned,
    sortByAsc,
    search,
  });

  const updateSearchParams = useCallback(() => {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      value ? params.set(key, String(value)) : params.delete(key);
    });
    const url = pathname + "?" + params.toString();
    router.push(url);
  }, [filter]);

  const handleChange = () => {
    updateSearchParams();
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
