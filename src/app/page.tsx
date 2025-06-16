"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSearchParams } from "next/navigation";
import { useCategory } from "@/context/CategoryContext";
import { useRouter } from "next/navigation";
import dishes from "@/data/products";
import CategorySidebar from "@/components/common/CategorySidebar";
import ProductCard from "@/components/product/ProductCard";
import dynamic from "next/dynamic";

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
  const isSmDown = useMediaQuery(theme.breakpoints.down("md"));
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
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ display: "flex", gap: 3, minWidth: 0 }}>
        {/* Category Sidebar - Desktop */}
        {isMdUp && (
          <Box sx={{ width: 280, flexShrink: 0 }}>
            <CategorySidebar />
          </Box>
        )}

        {/* Product Grid */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
                lg: "repeat(4, minmax(0, 1fr))",
              },
              width: "100%",
              minHeight: 300,
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

      {/* Mobile Category Menu (right side) */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{ display: isSmDown ? "block" : "none" }}
      >
        <Box sx={{ width: 250 }}>
          <CategorySidebar />
        </Box>
      </Drawer>
    </Container>
  );
}

// Create a client-side only wrapper component
const HomePage = () => {
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

  return <HomePageContent />;
};

const DynamicHomePage = dynamic(() => Promise.resolve(HomePage), {
  ssr: false,
});

export default DynamicHomePage;
