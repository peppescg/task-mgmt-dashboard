"use client";

// /* Instruments */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Modal as MuiModal } from "@mui/material";
import React from "react";

interface ModalProps {
  setOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  children: React.ReactNode;
  title: string;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

export const Modal = ({ setOpen, isOpen, children, title }: ModalProps) => {
  const handleClose = () => setOpen(false);

  return (
    <MuiModal open={isOpen} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <Typography
          id="modal-title"
          variant="h6"
          color="text.secondary"
          mb={1.5}
        >
          {title}
        </Typography>
        {children}
      </Box>
    </MuiModal>
  );
};
