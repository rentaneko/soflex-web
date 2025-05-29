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
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const router = useRouter();

  const handleQuantityChange = (id: string, change: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + change);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedItems(new Set(cartItems.map((item) => item.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectItem = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const handleDeleteAll = () => {
    cartItems.forEach((item) => removeFromCart(item.id));
    setSelectedItems(new Set());
  };

  const calculateItemTotal = (price: number, quantity: number) => {
    return (price * quantity).toLocaleString("vi-VN") + " ₫";
  };

  const handleCheckout = () => {
    clearCart();
    router.push("/checkout");
  };

  // Calculate total price directly from cartItems
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
            "&:hover": {
              backgroundColor: "#b71c1c",
              boxShadow: "0 6px 16px rgba(211, 47, 47, 0.3)",
            },
          }}
        >
          Delete All
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  onChange={handleSelectAll}
                  checked={
                    selectedItems.size === cartItems.length &&
                    cartItems.length > 0
                  }
                  indeterminate={
                    selectedItems.size > 0 &&
                    selectedItems.size < cartItems.length
                  }
                />
              </TableCell>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedItems.has(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                  />
                </TableCell>
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
                        backgroundColor: "#f5f5f5",
                        "&:hover": {
                          backgroundColor: "#e0e0e0",
                        },
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      value={item.quantity}
                      size="small"
                      sx={{ width: "60px", mx: 1 }}
                      inputProps={{ min: 1, style: { textAlign: "center" } }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(item.id, 1)}
                      sx={{
                        backgroundColor: "#f5f5f5",
                        "&:hover": {
                          backgroundColor: "#e0e0e0",
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

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Paper
          sx={{
            p: 2,
            minWidth: 300,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="subtitle1">Grand Total:</Typography>
            <Typography variant="subtitle1">
              {totalPrice.toLocaleString("vi-VN")} đ
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            sx={{
              backgroundColor: "#51B545",
              color: "white",
              boxShadow: "0 4px 12px rgba(81, 181, 69, 0.2)",
              "&:hover": {
                backgroundColor: "#45a03a",
                boxShadow: "0 6px 16px rgba(81, 181, 69, 0.3)",
              },
              "&.Mui-disabled": {
                backgroundColor: "#cccccc",
                color: "#ffffff",
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
