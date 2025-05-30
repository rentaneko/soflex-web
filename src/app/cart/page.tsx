"use client";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Checkbox,
  Button,
  TextField,
  Divider,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleQuantityChange = (id: string, change: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + change);
    }
  };

  const handleQuantityInputChange = (id: string, value: string) => {
    const newQuantity = parseInt(value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleDeleteAll = () => {
    clearCart();
  };

  const calculateItemTotal = (price: number, quantity: number) => {
    return (price * quantity).toLocaleString("vi-VN") + " ₫";
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  // Calculate total price for all items
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!isClient) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Box
        sx={{
          p: 3,
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
          gap: 3,
        }}
      >
        <ShoppingCartIcon sx={{ fontSize: 80, color: "text.secondary" }} />
        <Typography variant="h5" color="text.secondary">
          Your cart is empty
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/")}
        >
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          p: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <Typography variant="h4">Shopping Cart</Typography>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteAll}
          sx={{
            backgroundColor: "#d32f2f",
            color: "white",
            boxShadow: "0 4px 12px rgba(211, 47, 47, 0.2)",
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#b71c1c",
              boxShadow: "0 6px 16px rgba(211, 47, 47, 0.3)",
            },
          }}
        >
          Delete All
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 3,
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: 2,
            flex: 1,
            border: "1px solid #e0e0e0",
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                <TableCell sx={{ borderBottom: "2px solid #e0e0e0" }}>
                  Product
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderBottom: "2px solid #e0e0e0" }}
                >
                  Price
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderBottom: "2px solid #e0e0e0" }}
                >
                  Quantity
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderBottom: "2px solid #e0e0e0" }}
                >
                  Total
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderBottom: "2px solid #e0e0e0" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f8f9fa",
                    },
                  }}
                >
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle1">{item.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {item.price.toLocaleString("vi-VN")} ₫
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        sx={{
                          backgroundColor: "#51B545",
                          color: "#fff",
                          boxShadow: "0 2px 8px rgba(81,181,69,0.10)",
                          mx: 0.5,
                          borderRadius: 1,
                          "&:hover": {
                            backgroundColor: "#45a03a",
                            boxShadow: "0 4px 16px rgba(81,181,69,0.18)",
                          },
                        }}
                        disabled={item.quantity <= 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <TextField
                        value={item.quantity}
                        size="small"
                        onChange={(e) =>
                          handleQuantityInputChange(item.id, e.target.value)
                        }
                        sx={{
                          width: "60px",
                          mx: 1,
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
                        inputProps={{
                          min: 1,
                          style: { textAlign: "center" },
                          type: "number",
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        sx={{
                          backgroundColor: "#51B545",
                          color: "#fff",
                          boxShadow: "0 2px 8px rgba(81,181,69,0.10)",
                          mx: 0.5,
                          borderRadius: 1,
                          "&:hover": {
                            backgroundColor: "#45a03a",
                            boxShadow: "0 4px 16px rgba(81,181,69,0.18)",
                          },
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {calculateItemTotal(item.price, item.quantity)}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="error"
                      onClick={() => removeFromCart(item.id)}
                      sx={{
                        borderRadius: 1,
                        "&:hover": {
                          backgroundColor: "rgba(211, 47, 47, 0.1)",
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Paper
          sx={{
            p: 3,
            width: isMobile ? "100%" : 350,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: 2,
            alignSelf: isMobile ? "stretch" : "flex-start",
            backgroundColor: "#f8f9fa",
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h5" gutterBottom fontWeight={700}>
            Order Summary
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="subtitle1">Total Items:</Typography>
            <Typography variant="subtitle1" fontWeight={600}>
              {cartItems.length}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h6">Grand Total:</Typography>
            <Typography variant="h6" fontWeight={700} color="#51B545">
              {totalPrice.toLocaleString("vi-VN")} ₫
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCheckout}
            sx={{
              backgroundColor: "#51B545",
              color: "white",
              boxShadow: "0 4px 12px rgba(81, 181, 69, 0.2)",
              py: 1.5,
              fontSize: "1.1rem",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#45a03a",
                boxShadow: "0 6px 16px rgba(81, 181, 69, 0.3)",
              },
            }}
          >
            Proceed to Checkout
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default CartPage;
