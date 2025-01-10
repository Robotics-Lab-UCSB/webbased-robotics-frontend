import React, { useState, useEffect, useRef } from 'react';
import { Box, Tabs, Tab, Card, CardContent, Typography, Button } from '@mui/material';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import LabPopup from '../labPopUp';
import LabInvitationBanner from '../invite';

interface Lab {
  id: string;
  name: string;
  description: string;
  sharedByDescription?: string;
  isActive: boolean;
  timeRemaining?: number;
  ownedByUser?: boolean;
  permission?: "read" | "write";
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeLabs, setActiveLabs] = useState<Lab[]>([]);
  const availableLabs = useRef<Lab[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [labPopupOpen, setLabPopupOpen] = useState(false); // State to control popup visibility
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null); // State to store the selected lab
  const navigate = useNavigate();
  const [labIds, setLabIds] = useState<string[]>([]); // State to store invite lab IDs

  const acceptLabInvitation = async (labId: string) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/accept_collaboration/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lab_id: labId }),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log(`Successfully accepted lab: ${labId}`);
        // Remove the accepted lab ID from the list
        setLabIds((prev) => prev.filter((id) => id !== labId));
      } else {
        console.error(`Error accepting lab ${labId}:`, data.error || "Unknown error");
      }
    } catch (error: any) {
      console.error("Error accepting lab invitation:", error.message);
    }
  };  

  useEffect(() => {
    const fetchActiveLabs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/auth/get_active_labs/", {
          method: "GET",
          credentials: "include",
        });
      
        if (!response.ok) {
          throw new Error("Failed to fetch active labs");
        }
      
        const data: {
          labs_shared: { owner_email: string, lab_id: string; lab_name: string; permission: "read" | "write" }[];
        } = await response.json();
      
        // Update availableLabs with permissions for shared labs
        const updatedLabs = availableLabs.current.map((lab) => {
          const sharedLab = data.labs_shared.find(
            (shared) => shared.lab_id === lab.id && lab.isActive === true
          );
          if (sharedLab) {
            return {
              ...lab,
              permission: sharedLab.permission,
              sharedByDescription: "You have permission [" + sharedLab.permission + "] given by " + 
              sharedLab.owner_email,
            }; // Update permission and description
          }
          return lab; // Return unchanged lab if no match
        });
      
        // Filter owned labs that are active
        const ownedActiveLabs = updatedLabs.filter(
          (lab) => lab.ownedByUser === true && lab.isActive === true
        );
      
        // Filter shared labs that are active
        const activeSharedLabs = updatedLabs.filter(
          (lab) => lab.ownedByUser === false && lab.isActive === true && lab.permission
        );
      
        // Combine owned and shared active labs into a single array
        const allActiveLabs = [...ownedActiveLabs, ...activeSharedLabs];
      
        // Update states
        availableLabs.current = updatedLabs; // Update available labs with shared permissions
        setActiveLabs(allActiveLabs); // Set the combined active labs
      } catch (err: any) {
        console.error("Error fetching active labs:", err.message);
        setError(err.message);
      }      
    };
    

    const fetchAllLabs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/auth/get_all_labs/', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch all labs');
        }

        const data: { labs: { lab_id: string; name: string; time_remaining: number; owned_by_user: boolean }[] } = await response.json();

        const labs = data.labs.map((lab) => ({
          id: lab.lab_id,
          name: lab.name,
          description: `${lab.name} Description`,
          timeRemaining: lab.time_remaining,
          isActive: lab.time_remaining > 0,
          ownedByUser: lab.owned_by_user,
        }));

        availableLabs.current = labs;
      } catch (err: any) {
        console.error("Error fetching all labs:", err.message);
        setError(err.message);
      }
    };

    const fetchAndProcessLabs = async () => {
      await fetchAllLabs();
      fetchActiveLabs();
    };

    fetchAndProcessLabs();
  }, [activeTab, labIds]);

  const fetchCollaboratorLabIds = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/get_all_collaborators_by_email/", {
        method: "GET",
        credentials: "include", // Include cookies for session-based authentication
      });

      if (!response.ok) {
        throw new Error("Failed to fetch collaborator lab IDs");
      }

      const data = await response.json();
      console.log(data)
      if (data.lab_ids) {
        setLabIds(data.lab_ids); // Store the fetched lab IDs in state
      } else {
        console.error("No lab IDs found in response:", data);
      }
    } catch (error: any) {
      console.error("Error fetching collaborator lab IDs:", error.message);
    }
  };

  useEffect(() => {
    // Fetch immediately
    fetchCollaboratorLabIds();

    // Set up polling every 20 seconds
    const intervalId = setInterval(() => {
      fetchCollaboratorLabIds();
    }, 20000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only on mount

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const rejoinLab = async (labId: string) => {  
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/rejoin_lab/', {
        method: 'POST',
        credentials: 'include', // Include cookies for session-based authentication
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lab_id: labId }),
      });

      const data = await response.json();
      console.log(data); 
      if (data.success) {
        navigate(`/lab/${labId}`); // Correctly formatted navigate call
      } else {
        console.error('Failed to rejoin lab:', data.error || 'Unknown error occurred');
        alert(`Error: ${data.error}`); // Corrected template literal for alert
      }
    } catch (err: any) {
      console.error('Error rejoining lab:', err.message);
      alert('Failed to rejoin the lab due to a network or server error.');
    }
  };

  const startLab = (labId: string, labName: string) => {
    const lab = availableLabs.current.find((lab) => lab.id === labId);
    if (lab) {
      setSelectedLab(lab); // Set selected lab details
      setLabPopupOpen(true); // Open the LabPopup
    }
  };

  const renderLabCards = (labs: Lab[]) => (
    <div className="grid-container">
      {labs.map((lab) => (
        <div className="card-container" key={lab.id}>
          <Card
            className={`custom-card ${
              lab.permission ? "shared-lab-effect" : ""
            }`}
          >
            <CardContent className="card-content">
              <div className="card-image-container">
                <img
                  src="/labIcons/fh.png"
                  alt={`${lab.name} Thumbnail`}
                  className="card-image"
                />
              </div>
              <Typography variant="h6" component="div" className="card-title">
                {lab.name}
              </Typography>
              <Typography variant="body2" className="card-description">
                {lab.description}
              </Typography>
              <Typography variant="body2" className="card-sharedByDescription">
                {lab.sharedByDescription}
              </Typography>
              <div className="card-button-container">
                {lab.timeRemaining === 0 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    className="start-lab-button"
                    onClick={() => startLab(lab.id, lab.name)}
                  >
                    Start Lab
                  </Button>
                ) : lab.ownedByUser || lab.permission === "write" ? (
                  <Button
                    variant="contained"
                    color="primary"
                    className="return-lab-button"
                    onClick={() => rejoinLab(lab.id)}
                  >
                    Return To Lab
                  </Button>
                ) : (
                  <Typography variant="body2" className="card-time-remaining">
                    Time Remaining: {lab.timeRemaining} minutes
                  </Typography>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );  

  return (
    <>
      <Box
        sx={{
          position: "absolute", // Position absolutely
          top: "16px", // Position at the top
          right: "16px", // Position on the right
          zIndex: 1004, // Ensure it stays above other elements
          maxWidth: "300px", // Constrain the width of the banner
          display: "flex",
          flexDirection: "column", // Stack banners vertically
          gap: "8px", // Add space between banners
        }}
      >
        {labIds.map((labId) => (
          <LabInvitationBanner key={labId} labId={labId} onAccept={acceptLabInvitation} />
        ))}
      </Box>
      <div className="dashboard-container">
        <Box className="tabsContainerSticky">
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="lab tabs">
            <Tab label="Your Active Labs" />
            <Tab label="Available Labs" />
            <Tab label="Past Activity" />
            <Tab label="Settings" />
          </Tabs>
        </Box>
        <Box className="content-container">
          {activeTab === 0 && renderLabCards(activeLabs)}
          {activeTab === 1 && renderLabCards(availableLabs.current)}
          {error && (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          )}
          {activeTab === 1 && availableLabs.current.length === 0 && (
            <Typography variant="body1" color="textSecondary">
              No available labs.
            </Typography>
          )}
        </Box>
        {/* LabPopup rendered conditionally */}
        {selectedLab && (
          <LabPopup
            open={labPopupOpen}
            onClose={() => setLabPopupOpen(false)}
            labName={selectedLab.name}
            labId={selectedLab.id}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
