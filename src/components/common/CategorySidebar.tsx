"use client";
import {
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import categories from "@/data/categories";
import { useCategory } from "@/context/CategoryContext";

interface CategorySidebarProps {
  variant?: "drawer" | "sidebar";
}

export default function CategorySidebar({
  variant = "sidebar",
}: CategorySidebarProps) {
  const { selectedCategory, setSelectedCategory, setMobileMenuOpen } =
    useCategory();

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setMobileMenuOpen(false);
  };

  const content = (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Danh mục sản phẩm
      </Typography>
      <List>
        <ListItemButton
          selected={!selectedCategory}
          onClick={() => handleCategorySelect(null)}
        >
          <ListItemText primary="Tất cả sản phẩm" />
        </ListItemButton>
        {categories.map((category) => (
          <ListItemButton
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            selected={selectedCategory === category.id}
          >
            <ListItemText primary={category.name} />
          </ListItemButton>
        ))}
      </List>
    </>
  );

  if (variant === "drawer") {
    return <Box sx={{ width: 250, p: 2 }}>{content}</Box>;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        height: "100%",
        backgroundColor: "background.paper",
      }}
    >
      {content}
    </Paper>
  );
}
