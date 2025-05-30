"use client";

import React, { Suspense } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function OrderConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const removedIds = searchParams.get("removedIds")?.split(",") || [];

  return (
    <Box sx={{ p: 3, maxWidth: 600, margin: "0 auto" }}>
      <Paper
        sx={{
          p: 4,
          textAlign: "center",
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h4" gutterBottom color="primary">
          Đặt hàng thành công!
        </Typography>
        <Typography variant="body1" paragraph>
          Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được xác nhận.
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Mã đơn hàng: {Date.now().toString().slice(-6)}
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Link href="/" passHref>
            <Button
              variant="contained"
              color="primary"
              sx={{
                mr: 2,
                backgroundColor: "#51B545",
                "&:hover": {
                  backgroundColor: "#45a03a",
                },
              }}
            >
              Tiếp tục mua sắm
            </Button>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ p: 3, maxWidth: 600, margin: "0 auto" }}>
          <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
            <Typography>Loading...</Typography>
          </Paper>
        </Box>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
