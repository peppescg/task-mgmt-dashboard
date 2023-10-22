"use client";

/* Core */
import { Provider } from "react-redux";

/* Instruments */
import { reduxStore } from "@/lib/redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es-us";

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-us">
      <Provider store={reduxStore}>{props.children}</Provider>
    </LocalizationProvider>
  );
};
