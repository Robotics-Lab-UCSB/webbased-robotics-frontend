import React from "react";
import { Box, Typography, Button } from "@mui/material";

interface LabInvitationBannerProps {
  labId: string;
  onAccept: (labId: string) => void;
}

const LabInvitationBanner: React.FC<LabInvitationBannerProps> = ({ labId, onAccept }) => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f0f4ff", // Light blue background
          padding: "8px 12px",
          borderRadius: "8px",
          border: "1px solid #d0d8f0",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          maxWidth: "100%", // Keep it within the parent's maxWidth
          wordWrap: "break-word", // Handle long text
        }}
      >
        <Typography variant="body2" sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          Lab Invitation: <strong>{labId}</strong>
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={() => onAccept(labId)}
          sx={{ marginLeft: "8px" }}
        >
          Accept
        </Button>
      </Box>
    );
  };
  

export default LabInvitationBanner;
