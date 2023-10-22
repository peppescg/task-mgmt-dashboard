import {
  AppBar,
  Box,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";

export const FooterBar = () => (
  <Box sx={{ backgroundColor: "primary.main" }} height="100%">
    <Typography
      variant="h6"
      color="common.white"
      mx={2}
      sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
    >
      Credits Giuseppe Scuglia
    </Typography>
  </Box>
);
