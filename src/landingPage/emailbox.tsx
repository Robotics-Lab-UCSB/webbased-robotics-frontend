import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface EmailBoxProps {
  email: string;
  onDelete?: () => void; // Function to handle deletion
}

const EmailBox: React.FC<EmailBoxProps> = ({ email, onDelete }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 16px",
        borderRadius: "8px",
        backgroundColor: "#f5f5f5",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        width: "fit-content",
      }}
    >
      {/* Email Text */}
      <Typography variant="body1" sx={{ marginRight: "8px" }}>
        {email}
      </Typography>

      {/* Delete Button */}
      <IconButton
        onClick={onDelete}
        size="small"
        sx={{
          backgroundColor: "transparent",
          padding: "4px",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" },
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default EmailBox;
