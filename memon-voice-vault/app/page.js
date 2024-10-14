'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from 'react';
import {
  Box,
  Modal,
  Stack,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import dynamic from 'next/dynamic';
import ThumbUp from '@mui/icons-material/ThumbUp';
import { Remove } from '@mui/icons-material';
export default function Home() {
  return (
      <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}>
        <h3> Memon Memories Vault</h3>
      </Box>

  );
}
