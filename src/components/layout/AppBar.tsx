"use client";

import React from "react";
import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Badge,
} from "@mui/material";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../styles/styledComponents";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useSearch } from "../../context/SearchContext";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";

export default function AppBar() {
  const { searchQuery, setSearchQuery } = useSearch();
  const { totalItems } = useCart();
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                cursor: "pointer",
                "&:hover": { opacity: 0.8 },
                color: "white",
              }}
            >
              SOFLEX
            </Typography>
          </Link>
          <form onSubmit={handleSearchSubmit} style={{ margin: "0 16px" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Tìm kiếm..."
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Search>
          </form>
          <Box sx={{ display: { xs: "flex", md: "block" } }}>
            <IconButton
              size="large"
              aria-label="go to cart"
              color="inherit"
              onClick={handleCartClick}
            >
              <Badge badgeContent={totalItems} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
