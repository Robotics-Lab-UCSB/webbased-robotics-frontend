import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Card, CardContent, Typography } from '@mui/material';
import './Dashboard.css';

interface Lab {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeLabs, setActiveLabs] = useState<Lab[]>([]);
  const [availableLabs, setAvailableLabs] = useState<Lab[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch active labs on component mount
    const fetchActiveLabs = async () => {
        try {
          console.log("Sending fetch request with credentials: 'include'");
      
          const response = await fetch('http://127.0.0.1:8000/auth/get_active_labs/', {
            method: 'GET',
            credentials: 'include', // Include cookies for session-based authentication
          });
      
          console.log("Fetch response:", response);
      
          if (!response.ok) {
            throw new Error('Failed to fetch active labs');
          }
      
          const data = await response.json();
          console.log("Active labs data:", data);
      
          const labs = data.labs.map((labName: string, index: number) => ({
            id: index + 1,
            name: labName,
            description: `${labName} Description`,
            isActive: true,
          }));
      
          setActiveLabs(labs);
        } catch (err: any) {
          console.error("Error fetching active labs:", err.message);
          setError(err.message);
        }
      };
    fetchActiveLabs();      
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const renderLabCards = (labs: Lab[]) => (
    <div className="grid-container">
      {labs.map((lab) => (
        <div className="card-container" key={lab.id}>
          <Card className="custom-card">
            <CardContent>
              <Typography variant="h6" component="div" className="card-title">
                {lab.name}
              </Typography>
              <Typography variant="body2" className="card-description">
                {lab.description}
              </Typography>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );

  return (
    <div className="dashboard-container">
      <Box className="tabs-container">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="lab tabs">
          <Tab label="Your Active Labs" />
          <Tab label="Available Labs" />
          <Tab label="Past Activity" />
          <Tab label="Settings" />
        </Tabs>
      </Box>
      <Box className="content-container">
        {activeTab === 0 && renderLabCards(activeLabs)}
        {activeTab === 1 && renderLabCards(availableLabs)}
        {error && (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        )}
        {activeTab === 1 && availableLabs.length === 0 && (
          <Typography variant="body1" color="textSecondary">
            No available labs.
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default Dashboard;
