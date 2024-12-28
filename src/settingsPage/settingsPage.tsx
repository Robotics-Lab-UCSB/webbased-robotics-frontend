import React, { useState } from "react"
import CircleButton from "../Assisstant/assiantIcon"

interface SettingsPageProps {
}

const SettingsPage: React.FC<SettingsPageProps> = ({ }) => {
    const [chatBoxOpen, setChatBoxOpen] = useState(false)

    const toggleChatBox = () => {
        setChatBoxOpen((prev) => !prev)
    }

    return (
        <div>
            <CircleButton onClick={toggleChatBox} position="top-right"/>
            {chatBoxOpen && (
                <div className="chatbox">
                    Chatbox is now open!
                </div>
            )}
        </div>
    )
}

export default SettingsPage
