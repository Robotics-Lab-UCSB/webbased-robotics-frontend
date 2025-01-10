import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
} from "@mui/material";
import EmailBox from "./emailbox";
import "./labPopup.css";

interface LabPopupProps {
  open: boolean;
  onClose: () => void;
  labName: string;
  labId: string;
}

const LabPopup: React.FC<LabPopupProps> = ({ open, onClose, labName, labId }) => {
  const [search, setSearch] = useState<string>("");
  const [foundCollaborators, setFoundCollaborators] = useState<string[]>([]);
  const [suggestedCollaborators, setSuggestedCollaborators] = useState<string[]>([]);
  const [selectedCollaborators, setSelectedCollaborators] = useState<string[]>([]);
  const [timeRestraint, setTimeRestraint] = useState<number>(1);

  useEffect(() => {
    const getAllUserEmails = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/auth/get_all_emails/", {
          method: "GET",
          credentials: "include", // Include cookies for session-based authentication
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch emails");
        }
  
        const data = await response.json();
        if (data.emails) {
          // Filter out emails that are already in selectedCollaborators
          const filteredEmails = data.emails.filter(
            (email: string) => !selectedCollaborators.includes(email)
          );
          setFoundCollaborators(filteredEmails); // Store only unselected emails
        } else {
          console.error("No emails found in response:", data);
        }
      } catch (error: any) {
        console.error("Error fetching user emails:", error.message);
      }
    };
  
    getAllUserEmails();
  }, [open, selectedCollaborators]); // Include selectedCollaborators in dependency array  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value) {
      // Suggest collaborators based on the search input
      const suggestions = foundCollaborators.filter((email) =>
        email.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestedCollaborators(suggestions);
    } else {
      setSuggestedCollaborators([]);
    }
  };

  const handleSuggestionClick = (email: string) => {
    if (!selectedCollaborators.includes(email)) {
      setSelectedCollaborators((prev) => [...prev, email]);
    }
    setSearch(""); // Clear search after selection
    setSuggestedCollaborators([]); // Clear suggestions
    setFoundCollaborators((prev) => prev.filter((collab) => collab !== email));
  };

  const handleStartLab = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/start_lab/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lab_id: labId,
          lab_name: labName,
          time_restraint: timeRestraint,
          collaborators: selectedCollaborators,
        }),
      });

      const data = await response.json();
      console.log(data)
      if (data.success === true) {
        console.log("Lab started successfully:", data.message);
        window.location.href = `/lab/${labId}`; // Redirect to the lab page
      } else {
        console.error("Lab start failed:", data.error || "Unknown error occurred");
        alert(`Error: ${data.error}`);
      }
    } catch (err: any) {
      console.error("Error starting lab:", err.message);
      alert("Failed to start the lab due to a network or server error.");
    }
  };

  const handleDeleteCollborator = (email: string) => {
    setSelectedCollaborators((prev) => prev.filter((collab) => collab !== email));
    setFoundCollaborators((prev) => [...prev, email]);
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {/* Lab Name */}
        <Typography variant="h6" gutterBottom>
          {labName}
        </Typography>

        {/* Search Collaborators */}
        <Typography variant="subtitle1" gutterBottom>
          Invite Collaborators
        </Typography>
        <TextField
          fullWidth
          value={search}
          onChange={handleSearchChange}
          placeholder="Search for collaborators..."
          variant="outlined"
          margin="dense"
        />
        {suggestedCollaborators.length > 0 && (
          <Paper
            sx={{
              position: "absolute",
              zIndex: 10,
              width: "86%", // Adjust to match TextField width
              marginTop: "-1px",
              backgroundColor: "white",
              maxHeight: 150,
              overflowY: "auto",
              boxShadow: 3,
            }}
          >
            {suggestedCollaborators.slice(0, 3).map((email) => (
              <ListItem
                key={email}
                onClick={() => handleSuggestionClick(email)}
                sx={{ borderBottom: "1px solid #ccc" }}
              >
                <ListItemText primary={email} />
              </ListItem>
            ))}
          </Paper>
        )}
        <div className="block-wrapper">
            {selectedCollaborators.map((email) => (
                <EmailBox key={email} email={email} onDelete={() => handleDeleteCollborator(email)} />
            ))}
        </div>

        {/* Time Restraint */}
        <Typography variant="subtitle1" gutterBottom>
          Select Session Duration
        </Typography>
        <RadioGroup
          value={timeRestraint}
          onChange={(e) => setTimeRestraint(Number(e.target.value))}
        >
          <FormControlLabel value={1} control={<Radio />} label="1 Hour" />
          <FormControlLabel value={2} control={<Radio />} label="2 Hours" />
          <FormControlLabel value={3} control={<Radio />} label="3 Hours" />
        </RadioGroup>

        {/* Note */}
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Don't worry, when your session ends, your progress is saved.
        </Typography>

        {/* Enter Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleStartLab}
          sx={{ mt: 2 }}
        >
          Enter
        </Button>
      </Box>
    </Modal>
  );
};

export default LabPopup;
