"use client";
import React, { useState, useEffect, Suspense } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSearchParams } from "next/navigation";
import { useCategory } from "@/context/CategoryContext";
import { useRouter } from "next/navigation";
import dishes from "@/data/products";
import CategorySidebar from "@/components/common/CategorySidebar";
import ProductCard from "@/components/product/ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  subcategory?: string;
}

interface CartItem extends Product {
  quantity: number;
}

function HomePageContent() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const searchParams = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(dishes);
  const { selectedCategory } = useCategory();
  const router = useRouter();

  // Filter products based on category, subcategory and search query
  useEffect(() => {
    let filtered = [...dishes];
    const searchQuery = searchParams.get("q");

    if (selectedCategory) {
      // Check if we have a subcategory selection
      const [mainCategory, subcategory] = selectedCategory.split("/");

      if (subcategory) {
        // Filter by subcategory
        filtered = filtered.filter(
          (product) =>
            product.category === mainCategory &&
            product.subcategory === subcategory
        );
      } else {
        // Filter by main category only
        filtered = filtered.filter(
          (product) => product.category === mainCategory
        );
      }
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    setProducts(filtered);
  }, [selectedCategory, searchParams]);

  const handleCategorySelect = (categoryId: string | null) => {
    setMobileMenuOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Main Content */}
      <Container sx={{ flex: 1, py: 3 }}>
        <Box sx={{ display: "flex", gap: 3 }}>
          {/* Category Sidebar - Desktop */}
          {isMdUp && (
            <Box sx={{ width: 280, flexShrink: 0 }}>
              <CategorySidebar />
            </Box>
          )}

          {/* Product Grid */}
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
              }}
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  image={product.image}
                />
              ))}
              {products.length === 0 && (
                <Box
                  sx={{
                    gridColumn: "1/-1",
                    textAlign: "center",
                    py: 4,
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    Không tìm thấy sản phẩm nào
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Mobile Category Menu */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box sx={{ width: 250 }}>
          <CategorySidebar />
        </Box>
      </Drawer>
    </Box>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
