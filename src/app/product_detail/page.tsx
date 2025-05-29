"use client";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Button,
  useMediaQuery,
  IconButton,
  TextField,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "@/context/CartContext";
import theme from "@/styles/themes";
import dishes from "@/data/products";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
};

export default function ProductDetailPage() {
  const searchParams = useSearchParams();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const productId = searchParams.get("id");
    if (productId) {
      const foundProduct = dishes.find((dish) => dish.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        // Set initial quantity if product is in cart
        const cartItem = cartItems.find((item) => item.id === productId);
        if (cartItem) {
          setQuantity(cartItem.quantity);
        }
      }
    }
  }, [searchParams, cartItems]);

  if (!product) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h5">Product not found</Typography>
      </Box>
    );
  }

  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
    if (isInCart) {
      updateQuantity(product.id, newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    });
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box sx={{ padding: 2, maxWidth: 1200, margin: "auto" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: isLargeScreen ? "row" : "column",
            gap: 4,
          }}
        >
          {/* Product Image */}
          <Box
            sx={{
              flex: isLargeScreen ? "0 0 50%" : "1",
              maxWidth: isLargeScreen ? "50%" : "100%",
            }}
          >
            <Card
              sx={{
                border: "1px solid #eee",
                borderRadius: 3,
                overflow: "hidden",
                height: "100%",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardMedia
                sx={{
                  height: isLargeScreen ? 500 : 300,
                  objectFit: "cover",
                }}
                image={product.image}
                title={product.name}
                component="img"
              />
            </Card>
          </Box>

          {/* Product Details */}
          <Box
            sx={{
              flex: isLargeScreen ? "0 0 50%" : "1",
              maxWidth: isLargeScreen ? "50%" : "100%",
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>

            <Typography
              variant="h5"
              color="primary"
              gutterBottom
              sx={{ mb: 3 }}
            >
              {product.price.toLocaleString("vi-VN")} ₫
            </Typography>

            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Danh mục: {product.category}
            </Typography>

            {isInCart ? (
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <IconButton
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
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
                  value={quantity}
                  size="small"
                  sx={{
                    width: "60px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#e0e0e0",
                      },
                      "&:hover fieldset": {
                        borderColor: "#51B545",
                      },
                    },
                  }}
                  inputProps={{ min: 1, style: { textAlign: "center" } }}
                />
                <IconButton
                  onClick={() => handleQuantityChange(1)}
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
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleAddToCart}
                sx={{
                  width: "100%",
                  maxWidth: 400,
                  height: 48,
                  backgroundColor: "#51B545",
                  color: "white",
                  boxShadow: "0 4px 12px rgba(81, 181, 69, 0.2)",
                  "&:hover": {
                    backgroundColor: "#45a03a",
                    boxShadow: "0 6px 16px rgba(81, 181, 69, 0.3)",
                  },
                }}
              >
                Add to Cart
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Suspense>
  );
}
