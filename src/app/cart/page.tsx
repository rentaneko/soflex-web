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
  Button,
  TextField,
  Divider,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Container,
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
import dynamic from "next/dynamic";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

const CartContent = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Confirmation dialog state
  const [openConfirm, setOpenConfirm] = useState(false);

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

  // Open confirmation dialog
  const handleDeleteAll = () => {
    setOpenConfirm(true);
  };

  // Confirm clear cart
  const handleConfirmDeleteAll = () => {
    clearCart();
    setOpenConfirm(false);
  };

  // Cancel clear cart
  const handleCancelDeleteAll = () => {
    setOpenConfirm(false);
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

  // Add state and handler at the top of CartContent
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        {/* Confirmation Dialog */}
        <Dialog open={openConfirm} onClose={handleCancelDeleteAll}>
          <DialogTitle>Clear Cart?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete all items from your cart? This
              action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCancelDeleteAll}
              sx={{
                backgroundColor: "#d32f2f",
                color: "#fff",
                "&:hover": { backgroundColor: "#b71c1c" },
              }}
              variant="contained"
            >
              No
            </Button>
            <Button
              onClick={handleConfirmDeleteAll}
              sx={{
                backgroundColor: "#51B545",
                color: "#fff",
                "&:hover": { backgroundColor: "#45a03a" },
              }}
              variant="contained"
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
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
          <Box sx={{ height: 50 }} />
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
            display: isMobile ? "block" : "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 350px",
            alignItems: "flex-start",
            gap: 3,
            minHeight: isMobile ? undefined : "100vh",
            pr: isMobile ? 0 : "400px",
          }}
        >
          {isMobile ? (
            <Box>
              {cartItems.map((item) => (
                <Paper
                  key={item.id}
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: 3,
                    boxShadow: "0 2px 12px rgba(81,181,69,0.08)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    background: "#fff",
                    width: "100%",
                    maxWidth: "100vw",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "100%",
                    }}
                  >
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: "contain",
                        borderRadius: 2,
                        background: "#f4f8f6",
                        p: 1,
                        flexShrink: 0,
                      }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: 17,
                          mb: 0.5,
                          color: "#222",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: "#51B545", fontSize: 16 }}
                      >
                        {item.price.toLocaleString("vi-VN")} ₫
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: 14,
                          mt: 0.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 2,
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Button
                        variant="outlined"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={item.quantity <= 1}
                        sx={{
                          minWidth: 32,
                          px: 0,
                          fontWeight: 700,
                          borderColor: "#51B545",
                          color: "#51B545",
                          borderWidth: 2,
                          fontSize: 18,
                          background: "#fff",
                          "&:hover": {
                            background: "#f6fff8",
                            borderColor: "#51B545",
                          },
                        }}
                      >
                        –
                      </Button>
                      <Typography
                        variant="h6"
                        sx={{
                          mx: 1,
                          minWidth: 28,
                          textAlign: "center",
                          fontSize: 17,
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        sx={{
                          minWidth: 32,
                          px: 0,
                          fontWeight: 700,
                          borderColor: "#51B545",
                          color: "#51B545",
                          borderWidth: 2,
                          fontSize: 18,
                          background: "#fff",
                          "&:hover": {
                            background: "#f6fff8",
                            borderColor: "#51B545",
                          },
                        }}
                      >
                        +
                      </Button>
                    </Box>
                    <IconButton
                      color="error"
                      onClick={() => removeFromCart(item.id)}
                      sx={{
                        borderRadius: 2,
                        "&:hover": {
                          backgroundColor: "rgba(211, 47, 47, 0.1)",
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Paper>
              ))}
            </Box>
          ) : (
            <TableContainer
              // component={Paper}
              sx={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                mb: isMobile ? 3 : 0,
                width: isMobile ? "100%" : "230%",
                margin: isMobile ? undefined : "0 auto",
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
                      sx={{ "&:hover": { backgroundColor: "#f8f9fa" } }}
                    >
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Box
                            component="img"
                            src={item.image}
                            alt={item.name}
                            sx={{
                              width: 80,
                              height: 80,
                              objectFit: "contain",
                              borderRadius: 1,
                            }}
                          />
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{ fontSize: "20px", mb: 0.5 }}
                            >
                              {item.name}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                fontSize: "18px",
                                color: "text.secondary",
                                display: { xs: "none", md: "block" },
                              }}
                            >
                              {item.description}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: "18px" }}>
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
                                "& fieldset": { borderColor: "#e0e0e0" },
                                "&:hover fieldset": { borderColor: "#51B545" },
                              },
                            }}
                            inputProps={{
                              min: 1,
                              style: { textAlign: "center", fontSize: "18px" },
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
                      <TableCell
                        align="right"
                        sx={{ fontSize: "18px", flex: 1 }}
                      >
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
          )}

          <Paper
            sx={{
              p: 3,
              width: "100%",
              maxWidth: 350,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              borderRadius: 2,
              backgroundColor: "#f8f9fa",
              border: "1px solid #e0e0e0",
              position: isMobile ? "static" : "fixed",
              top: isMobile ? undefined : 200,
              right: isMobile ? undefined : 64,
              zIndex: isMobile ? undefined : 1300,
              justifySelf: isMobile ? "auto" : "end",
            }}
          >
            <Typography variant="h5" gutterBottom fontWeight={700}>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="subtitle1">Total Items:</Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                {cartItems.length}
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
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

        {/* 2. Add Back to Top button at the end of the CartContent component */}
        {showBackToTop && (
          <Button
            onClick={handleBackToTop}
            sx={{
              position: "fixed",
              bottom: 32,
              right: 32,
              zIndex: 2000,
              backgroundColor: "#51B545",
              color: "#fff",
              borderRadius: "50%",
              minWidth: 0,
              width: 56,
              height: 56,
              boxShadow: "0 4px 12px rgba(81,181,69,0.2)",
              "&:hover": { backgroundColor: "#45a03a" },
            }}
            aria-label="Back to Top"
          >
            ↑
          </Button>
        )}
      </Box>
    </Container>
  );
};

// Create a client-side only wrapper component
const CartPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
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

  return <CartContent />;
};

// Export the dynamic version of the page
export default dynamic(() => Promise.resolve(CartPage), {
  ssr: false,
});
