import Footer from "@/components/Shared/Footer";
import Header from "@/components/Shared/Header";
import { Box } from "@mui/material";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default CommonLayout;