"use client";

import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import dishes from "@/data/products";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      const results = dishes.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Search Results for "{searchParams.get("q")}"
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Found {searchResults.length} results
        </Typography>
      </Paper>

      {searchResults.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {searchResults.map((product) => (
            <Box key={product.id}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                description={product.description}
                image={product.image}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No products found matching your search criteria
          </Typography>
        </Box>
      )}
    </Container>
  );
}
