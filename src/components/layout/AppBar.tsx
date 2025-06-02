"use client";

import React, { useState } from "react";
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
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import categories from "@/data/categories";
import { useCategory } from "@/context/CategoryContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import dynamic from "next/dynamic";

const AppBar = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const { totalItems } = useCart();
  const { setSelectedCategory } = useCategory();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("md"));

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

  const handleHamburgerClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Logo Section for Small Screens */}
      {isSmDown && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 2,
            backgroundColor: "#51B545",
            position: "sticky",
            top: 0,
            zIndex: 1300,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                color: "white",
                fontWeight: 700,
                letterSpacing: "0.5px",
              }}
            >
              SOFLEX
            </Typography>
          </Link>
        </Box>
      )}

      <MuiAppBar
        position="sticky"
        sx={{
          top: 0,
          zIndex: 1200,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 3, sm: 3, md: 3.75 }, // 24px on mobile, 30px on desktop
            maxWidth: "1440px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {/* Large Screens Layout (md and up) */}
          {!isSmDown && (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: 3, // 24px gap between sections
              }}
            >
              {/* Left Section (1) - Logo */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <Link
                  href="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      cursor: "pointer",
                      "&:hover": { opacity: 0.8 },
                      color: "white",
                      fontWeight: 700,
                      letterSpacing: "0.5px",
                    }}
                  >
                    SOFLEX
                  </Typography>
                </Link>
              </Box>

              {/* Center Section (2) - Search */}
              <Box
                sx={{
                  flex: 2,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <form
                  onSubmit={handleSearchSubmit}
                  style={{ width: "100%", maxWidth: "600px" }}
                >
                  <Search
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-root": {
                        paddingLeft: "16px",
                        paddingRight: "16px",
                      },
                      "& .SearchIconWrapper": {
                        padding: "0 16px",
                      },
                    }}
                  >
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
              </Box>

              {/* Right Section (1) - Cart */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <IconButton
                  size="large"
                  aria-label="go to cart"
                  color="inherit"
                  onClick={handleCartClick}
                >
                  <Badge
                    badgeContent={totalItems > 99 ? "99+" : totalItems}
                    color="error"
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Box>
            </Box>
          )}

          {/* Small Screens Layout (sm and below) */}
          {isSmDown && (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: 2,
              }}
            >
              {/* Left - Menu */}
              <IconButton
                size="large"
                aria-label="filter categories"
                color="inherit"
                onClick={handleHamburgerClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                <MenuItem onClick={() => handleCategorySelect(null)}>
                  Tất cả sản phẩm
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                  >
                    {cat.name}
                  </MenuItem>
                ))}
              </Menu>

              {/* Center - Search */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <form onSubmit={handleSearchSubmit} style={{ width: "100%" }}>
                  <Search
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-root": {
                        paddingLeft: "16px",
                        paddingRight: "16px",
                      },
                      "& .SearchIconWrapper": {
                        padding: "0 16px",
                      },
                    }}
                  >
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
              </Box>

              {/* Right - Cart */}
              <IconButton
                size="large"
                aria-label="go to cart"
                color="inherit"
                onClick={handleCartClick}
              >
                <Badge
                  badgeContent={totalItems > 99 ? "99+" : totalItems}
                  color="error"
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};

export default dynamic(() => Promise.resolve(AppBar), {
  ssr: false,
});
