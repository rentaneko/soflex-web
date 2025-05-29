"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Button, Container } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Auto redirect after 15 seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 15000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
          gap: 3,
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 80, color: "success.main" }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Thank you for your purchase. Your order has been confirmed.
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          You will be redirected to the home page in 15 seconds...
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/")}
          sx={{ mt: 2 }}
        >
          Return to Home
        </Button>
      </Box>
    </Container>
  );
}
