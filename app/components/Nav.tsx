"use client";

/* Core */
import Link from "next/link";

/* Instruments */

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const Nav = () => (
  <Box display="flex" position="fixed">
    <CssBaseline />
    <AppBar component="nav">
      <Toolbar>
        <Link href="/">
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            TASK MANAGEMENT DASHBOARD
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  </Box>
);
