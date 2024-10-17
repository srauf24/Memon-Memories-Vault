"use client";
import Image from "next/image";
import styles from "./page.module.css";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
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
  IconButton,
} from "@mui/material";
import dynamic from "next/dynamic";
import ThumbUp from "@mui/icons-material/ThumbUp";
import { Remove } from "@mui/icons-material";
import {
  doc,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore"; // Correct imports for Firestore
const MemonMemoryVault = () => {
  const [open, setOpen] = useState(false); // Initially, modal is closed
  const [textEntry, setTextEntry] = useState("");
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
      <h1>Memon Yaadash Mukha 🔑🔒 </h1>

      <Button variant="contained" onClick={handleOpen}>
        <Typography variant="button">Nayi yaadas darj kar ➕</Typography>{" "}
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
            <Typography variant="h5"> Yaadash Likidah Yaar ✏️</Typography>
            <TextField
              value={textEntry}
              onChange={(e) => {
                setTextEntry(e.target.value); // Update the state with the input
                console.log(e.target.value); // Log the current value being typed
              }}
              label="Aek dafa .."
              variant="outlined"
              fullWidth
            />
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Bhejo
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};
// eslint-disable-next-line no-undef
export default dynamic(() => Promise.resolve(MemonMemoryVault), { ssr: false });
