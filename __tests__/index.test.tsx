import { act, screen, waitFor } from "@testing-library/react";
import Dashboard from "../app/page";
import { renderWithProviders } from "../utils/test-utils";
import * as hooks from "../app/hooks/useTask";
import userEvent from "@testing-library/user-event";
import * as useFilter from "@/app/hooks/useFilter";

const user = userEvent.setup();

const mockedTask = {
  title: "Test tasks",
  description: "description test 2",
  dueDate: 1698620400000,
  id: "aQmtq6HZusEoZvKhzSM_r",
  createdAt: 1697915659717,
  updatedAt: 1697989707447,
  pinned: false,
  done: true,
};

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useSearchParams: { get: jest.fn(), has: jest.fn() },
  usePathname: "",
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Dashboard", () => {
  beforeAll(() => {
    jest.spyOn(useFilter, "useFilter").mockReturnValue({
      done: false,
      todo: false,
      pinned: false,
      search: "",
      sortByAsc: false,
      setFilter: jest.fn(),
    });
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("get task list", () => {
    beforeAll(() => {
      jest.spyOn(hooks, "useTask").mockReturnValue({
        edit: jest.fn(),
        add: jest.fn(),
        remove: jest.fn(),
        task: undefined,
        getTasks: jest.fn(),
        getTaskById: jest.fn(),
        status: "idle",
        list: [mockedTask],
      });
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should render tasks and toolbar", () => {
      renderWithProviders(<Dashboard />);
      expect(
        screen.getByRole("textbox", {
          name: /search by title\.\.\./i,
        })
      ).toBeInTheDocument();
      expect(screen.getByTestId("done-toggle")).toBeInTheDocument();
      expect(screen.getByTestId("pinned-toggle")).toBeInTheDocument();
      expect(screen.getByTestId("todo-toggle")).toBeInTheDocument();
      expect(screen.getByTestId("sort-toggle")).toBeInTheDocument();
      expect(screen.getByTestId("task-title")).toHaveTextContent(/test tasks/i);
      expect(screen.getByTestId("CheckCircleIcon")).toBeInTheDocument();
      expect(screen.getByTestId("due-date-task")).toBeInTheDocument();
    });
  });

  it("add task", async () => {
    const spyCreate = jest.fn();
    jest.spyOn(hooks, "useTask").mockReturnValue({
      ...jest.requireActual("../app/hooks/useTask"),
      add: spyCreate,
      getTasks: jest.fn(),
      status: "idle",
      list: [],
    });

    renderWithProviders(<Dashboard />);

    await user.click(
      screen.getByRole("button", {
        name: /add task/i,
      })
    );

    expect(
      screen.getByRole("heading", {
        name: /create a task/i,
      })
    ).toBeInTheDocument();

    user.clear(screen.getByTestId("task-title-field"));

    const titleField = await screen.findByTestId("task-title-field");

    await act(async () => user.type(titleField, "title test"));
    await waitFor(() => {
      expect(titleField).toHaveValue("title test");
    });
    const descriptionField = await screen.findByTestId(
      "task-description-field"
    );
    user.type(descriptionField, "description test 2");
    await waitFor(() => {
      expect(descriptionField).toHaveValue("description test 2");
    });

    user.click(screen.getByTestId("submit"));

    await waitFor(() => {
      expect(spyCreate).toBeCalledTimes(1);
    });
  });

  it("edit task", async () => {
    const spyEdit = jest.fn();
    jest.spyOn(hooks, "useTask").mockReturnValue({
      ...jest.requireActual("../app/hooks/useTask"),
      edit: spyEdit,
      getTasks: jest.fn(),
      status: "idle",
      list: [mockedTask],
    });

    renderWithProviders(<Dashboard />);

    await user.click(screen.getByTestId("done-task"));

    await waitFor(() => {
      expect(spyEdit).toBeCalledWith({
        ...mockedTask,
        done: false,
      });
    });
  });

  it("delete task", async () => {
    const spyDelete = jest.fn();
    jest.spyOn(hooks, "useTask").mockReturnValue({
      ...jest.requireActual("../app/hooks/useTask"),
      remove: spyDelete,
      getTasks: jest.fn(),
      status: "idle",
      list: [mockedTask],
    });

    renderWithProviders(<Dashboard />);

    await user.click(screen.getByTestId("delete-task"));

    await waitFor(() => {
      expect(spyDelete).toBeCalledWith("aQmtq6HZusEoZvKhzSM_r");
    });
  });
});
