import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  image,
}) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const cartItem = cartItems.find((item) => item.id === id);
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ id, name, price, quantity: 1, image, description });
  };

  const handleQuantityChange = (change: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItem) {
      const newQuantity = Math.max(1, cartItem.quantity + change);
      updateQuantity(id, newQuantity);
    }
  };

  const handleCardClick = () => {
    router.push(`/product_detail?id=${id}`);
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: 300,
        maxWidth: 340,
        m: "auto",
        background: "#fff",
        transition: "box-shadow 0.2s, transform 0.2s",
        cursor: "pointer",
        height: 400,
        justifyContent: "flex-start",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 1,
          mt: 2,
        }}
      >
        <CardMedia
          onClick={handleCardClick}
          component="img"
          image={image}
          alt={name}
          sx={{
            maxHeight: "100%",
            maxWidth: "100%",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            cursor: "pointer",
          }}
        />
      </Box>
      <CardContent
        sx={{
          width: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          p: 0,
        }}
      >
        <Typography
          onClick={handleCardClick}
          variant="h6"
          sx={{
            fontSize: "20px",
            mb: 1,
            fontWeight: 600,
            cursor: "pointer",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </Typography>
        <Typography
          onClick={handleCardClick}
          variant="body1"
          color="text.secondary"
          sx={{
            fontSize: "18px",
            mb: 2,
            height: "54px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            cursor: "pointer",
          }}
        >
          {description}
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontSize: "20px", mb: 3, color: "#222", fontWeight: 700 }}
        >
          {price.toLocaleString("vi-VN")} ₫
        </Typography>
        {cartItem ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              mb: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={(e) => handleQuantityChange(-1, e)}
              disabled={cartItem.quantity <= 1}
              sx={{
                minWidth: 36,
                px: 0,
                fontWeight: 700,
                background: "#fff",
                borderColor: "#51B545",
                color: "#51B545",
                borderWidth: 2,
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
                minWidth: 32,
                textAlign: "center",
                fontSize: "18px",
              }}
            >
              {cartItem.quantity}
            </Typography>
            <Button
              variant="outlined"
              onClick={(e) => handleQuantityChange(1, e)}
              sx={{
                minWidth: 36,
                px: 0,
                fontWeight: 700,
                background: "#fff",
                borderColor: "#51B545",
                color: "#51B545",
                borderWidth: 2,
                "&:hover": {
                  background: "#f6fff8",
                  borderColor: "#51B545",
                },
              }}
            >
              +
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            fullWidth
            onClick={(e) => handleAddToCart(e)}
            sx={{
              backgroundColor: "#51B545",
              color: "#fff",
              fontWeight: 600,
              fontSize: "18px",
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(81,181,69,0.10)",
              py: 1,
              mb: 2,
              "&:hover": {
                backgroundColor: "#45a03a",
                boxShadow: "0 4px 16px rgba(81,181,69,0.18)",
              },
            }}
          >
            Add to Cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
