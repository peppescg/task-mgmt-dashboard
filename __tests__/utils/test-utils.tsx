import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es-us";

// import type { AppStore, RootState } from '../app/store'
// As a basic setup, import your same slice reducers
import { ReduxState, ReduxStore, taskSlice } from "@/lib/redux";
import { LocalizationProvider } from "@mui/x-date-pickers";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<ReduxState>;
  store?: ReduxStore;
}
taskSlice;

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = { task: { task: undefined, list: [], status: "idle" } },
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: { task: taskSlice.reducer },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-us">
        <Provider store={store}>{children}</Provider>
      </LocalizationProvider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
