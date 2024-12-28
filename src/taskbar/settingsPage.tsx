import React from "react";
import "./taskbar.css";
import ScrollableBlock from "./chatbox/slidableWindow";

interface SettingsPageProps {}

const SettingsPage: React.FC<SettingsPageProps> = () => {
  return (
    <div className="page-background">
      <ScrollableBlock>
        settings page dawg
      </ScrollableBlock>
    </div>
  );
};

export default SettingsPage;
