"use client";
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
} from "@mui/material";
import dynamic from "next/dynamic";
import { collection, getDocs } from "firebase/firestore";
import { fireStore } from "@/app/firebase"; // Correct imports for Firestore

const MemonMemoryVault = () => {
  const [open, setOpen] = useState(false); // Initially, modal is closed
  const [textEntry, setTextEntry] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [quotes, setQuotes] = useState([]);

  // Fetch quotes from Firestore
  useEffect(() => {
    const updateQuotes = async () => {
      const snapshot = await getDocs(collection(fireStore, "vault")); // Get the snapshot
      const quotesList = [];

      // Loop through each document in the snapshot
      snapshot.docs.forEach((doc) => {
        quotesList.push({
          id: doc.id,
          memory: doc.data().memory, // Assuming the 'memory' field exists in each document
        });
      });
      setQuotes(quotesList); // Update state with the list of quotes/memories
    };

    updateQuotes(); // Call the function on component mount
  }, []); // Empty dependency array to run this effect only once
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
      <h1>Memon Yaadash Mukha 🔑🔒</h1>

      {/* Button to open the modal */}
      <Button variant="contained" onClick={handleOpen}>
        <Typography variant="button">Nayi yaadas darj kar ➕</Typography>
      </Button>

      {/* Modal for entering a new quote */}
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
            <Typography variant="h5">Yaadash Likidah Yaar ✏️</Typography>
            <TextField
              value={textEntry}
              onChange={(e) => setTextEntry(e.target.value)} // Update the state with the input
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

      {/* Display quotes */}
      <Stack width="100%" spacing={2} mt={2}>
        {quotes.length > 0 ? (
          quotes.map(({ id }) => (
            <Card key={id} sx={{ minWidth: 275, margin: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {id ? `"${id}"` : "No memory available"}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No memories available</Typography>
        )}
      </Stack>
    </Box>
  );
};

// eslint-disable-next-line no-undef
export default dynamic(() => Promise.resolve(MemonMemoryVault), { ssr: false });
