"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    if (seconds === 0) {
      router.push("/");
    }
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, router]);

  // Optionally, show which products were removed
  // const removedIds = searchParams.get("removed")?.split(",") || [];

  return (
    <Box sx={{ p: 3, maxWidth: 500, margin: "40px auto" }}>
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" color="success.main" gutterBottom>
          Order Placed Successfully!
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Thank you for your purchase. Your order has been confirmed.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          You will be redirected to the home page in {seconds} seconds...
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "#51B545", color: "white" }}
          onClick={() => router.push("/")}
        >
          Back to Home
        </Button>
      </Paper>
    </Box>
  );
}
