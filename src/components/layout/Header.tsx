"use client";

import React from "react";
import { Box, Container } from "@mui/material";
import AppBar from "./AppBar";

interface HeaderProps {
  children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar />
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        {children}
      </Container>
    </Box>
  );
}
