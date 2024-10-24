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
import { fireStore } from "@/app/firebase"; // Correct imports for Firestore
import {
  doc,
  collection,
  getDocs,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore"; // Correct imports for Firestore

const MemonMemoryVault = () => {
  const [open, setOpen] = useState(false); // Initially, modal is closed
  const [textEntry, setTextEntry] = useState(""); // To track the new quote input
  const [quotes, setQuotes] = useState([]); // To store the list of quotes

  // Function to open and close the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Fetch quotes from Firestore on component mount
  useEffect(() => {
    const updateQuotes = async () => {
      const snapshot = await getDocs(collection(fireStore, "vault"));
      const quotesList = [];

      // Loop through each document in the snapshot
      snapshot.forEach((doc) => {
        quotesList.push({
          id: doc.id, // Use the document ID as the memory or quote
        });
      });
      setQuotes(quotesList); // Update the state with the list of quotes
    };

    updateQuotes(); // Fetch quotes when the component mounts
  }, []);

  // Function to add or update a quote in Firestore
  const addQuote = async (quote) => {
    const docRef = doc(fireStore, "vault", quote); // Reference to the document in 'vault' collection
    const docSnap = await getDoc(docRef); // Fetch the document from Firestore
    console.log('adding quote: ', quote)
    if (!docSnap.exists()) {
      // If the quote doesn't exist, create it with 0 likes
      await setDoc(docRef, {
        likes: 0, // Set initial likes to 0
        timestamp: serverTimestamp(), // Set the timestamp when created
      });
    }

    // Refresh the quotes after adding the new one
    const snapshot = await getDocs(collection(fireStore, 'vault'));
    const quotesList = [];

    snapshot.forEach((doc) => {
      quotesList.push({
        id: doc.id, // Use the document ID as the quote content
      });
    });

    setQuotes(quotesList); // Update the state with the refreshed list of quotes
    setTextEntry(""); // Clear the input field
  };

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
      <h1>Memon Yaadash Vault 🔑🔒</h1>

      {/* Button to open the modal */}
      <Button variant="contained" onClick={handleOpen}>
        <Typography variant="button">Add Memory/Quote ➕</Typography>
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
            width={{ xs: "90%", sm: "400px" }}
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
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => {
                addQuote(textEntry); // Call addQuote to add the new quote
                handleClose(); // Close the modal
              }}
            >
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

// Disable SSR for this page
export default dynamic(() => Promise.resolve(MemonMemoryVault), { ssr: false });
