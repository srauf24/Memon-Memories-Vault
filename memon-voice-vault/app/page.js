"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import {
  Box,
  Modal,
  Fade,
  Stack,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import dynamic from "next/dynamic";
import ThumbUp from "@mui/icons-material/ThumbUp";
import { Remove } from "@mui/icons-material";
const MemonMemoryVault = () => {
  const [open, setOpen] = useState(false); // Initially, modal is closed
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <h3> Memon Memories Vault</h3>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
      >
        <Typography variant="button">Add a new memory</Typography>{" "}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%,-50%)"
            width={{ xs: "90%", sm: "400px" }} // Responsive width
            bgcolor="white"
            border={"2px solid #000"}
            boxShadow={24}
            p={4}
            display="flex"
            flexDirection="column"
            gap={3}
          >
            <Typography variant="h5"> Memory Likidah Yaar 😉️ 📝</Typography>
            <TextField> </TextField>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};
// eslint-disable-next-line no-undef
export default dynamic(() => Promise.resolve(MemonMemoryVault), { ssr: false });
