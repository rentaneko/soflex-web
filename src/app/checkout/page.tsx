"use client";
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const paymentMethods = [
  { value: "cod", label: "Cash on Delivery" },
  { value: "credit", label: "Credit Card" },
  // Add more methods as needed
];

export default function CheckoutPage() {
  const { cartItems, removeFromCart } = useCart();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("cod");
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !address.trim() || !phone.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    // Remove all items from cart
    cartItems.forEach((item) => removeFromCart(item.id));
    // Redirect to confirmation page
    router.push("/order-confirmation");
  };

  return (
    <Box sx={{ py: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          p: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          mb: 3,
        }}
      >
        Checkout
      </Typography>
      {/* Totals summary above product list */}

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 3,
        }}
      >
        {/* Shipping & Payment Form */}
        <Paper
          sx={{
            flex: 1,
            p: 3,
            mb: isMobile ? 3 : 0,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Shipping Information
          </Typography>
          <form onSubmit={handlePlaceOrder}>
            <TextField
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              fullWidth
              required
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                  "& fieldset": {
                    borderColor: "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#51B545",
                  },
                },
              }}
            />
            <TextField
              label="Full Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              required
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                  "& fieldset": {
                    borderColor: "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#51B545",
                  },
                },
              }}
            />
            <TextField
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              required
              margin="normal"
              type="tel"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                  "& fieldset": {
                    borderColor: "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#51B545",
                  },
                },
              }}
            />
            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              Payment Method
            </Typography>
            <RadioGroup
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              sx={{ mb: 2 }}
            >
              {paymentMethods.map((method) => (
                <FormControlLabel
                  key={method.value}
                  value={method.value}
                  control={<Radio />}
                  label={method.label}
                />
              ))}
            </RadioGroup>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            {isMobile && <Divider sx={{ my: 3 }} />}
            {/* On mobile, show Place Order button below summary */}
            {!isMobile && (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: "#51B545",
                  color: "white",
                  borderRadius: 2,
                  py: 1.5,
                  fontSize: "1.1rem",
                  "&:hover": {
                    backgroundColor: "#45a03a",
                  },
                }}
              >
                Place Order
              </Button>
            )}
          </form>
        </Paper>

        {/* Order Summary */}
        <Paper
          sx={{
            width: isMobile ? "100%" : 350,
            p: 3,
            alignSelf: isMobile ? "stretch" : "flex-start",
            backgroundColor: "#f8f9fa",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: 2,
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h5" gutterBottom fontWeight={700}>
            Order Summary
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">Total Items:</Typography>
            <Typography variant="h6" fontWeight={600}>
              {cartItems.length}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h6">Grand Total:</Typography>
            <Typography variant="h6" fontWeight={700} color="#51B545">
              {total.toLocaleString("vi-VN")} ₫
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />
          {cartItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                mb: 2,
                p: 1,
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "#fff",
                },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>{item.name}</Typography>
                <Typography>
                  x{item.quantity} × {item.price.toLocaleString("vi-VN")} ₫
                </Typography>
              </Box>
            </Box>
          ))}
          {/* On mobile, show Place Order button here */}
          {isMobile && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#51B545",
                color: "white",
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#45a03a",
                },
              }}
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
