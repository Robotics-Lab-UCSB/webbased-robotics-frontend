# Web-Based Robotics Quantum Labs

**Web-Based Robotics Quantum Labs** is a cutting-edge system that models 8
different labs, enabling students from anywhere in the world to interact with
remote labs in real time. This platform bridges the gap between virtual and
physical spaces, allowing students to manipulate and control lab equipment
through realistic 3D models. The system provides real-time updates, reflecting
changes in the physical lab environment, making it a fully immersive and
accessible learning experience in quantum robotics.

Check out this graph of our systems:

```mermaid
graph TB
    subgraph Browser
        UA[User Access]
    end

    subgraph Frontend
        RA["React App"]:::frontend
        UI["User Interface"]:::frontend
        LP["Landing Page"]:::frontend
        SI["Settings Interface"]:::frontend
        TB["Task Bar"]:::frontend
        CI["Chat Interface"]:::frontend
        TDE["3D Engine"]:::frontend
    end

    subgraph Communication
        WS["WebSocket Layer"]:::comm
        RU["Real-time Updates"]:::comm
        CP["Context Providers"]:::comm
    end

    subgraph LabEquipment
        EC["Equipment Controllers"]:::lab
        DS["Data Sync"]:::lab
        CS["Camera System"]:::lab
        UI3D["3D Models"]:::lab
        LC["Lab Controls"]:::lab
        UIS["User Interaction System"]:::lab
    end

    subgraph AILayer
        AIS["AI System"]:::ai
        LG["Lab Guide"]:::ai
    end

    %% Connections
    UA --> RA
    RA --> UI
    UI --> LP
    UI --> SI
    UI --> TB
    TB --> CI
    RA --> TDE
    TDE --> UI3D
    WS --> RU
    RU --> CP
    CP --> UI
    EC --> DS
    DS --> WS
    CS --> TDE
    UIS --> TDE
    LC --> CS
    CI --> AIS
    AIS --> LG
    LG --> UI

    %% Click Events
    click RA "https://github.com/Robotics-Lab-UCSB/webbased-robotics-frontend/blob/main/src/App.tsx"
    click AIS "https://github.com/Robotics-Lab-UCSB/webbased-robotics-frontend/blob/main/src/Assisstant/alltogether.tsx"
    click WS "https://github.com/Robotics-Lab-UCSB/webbased-robotics-frontend/blob/main/src/Websocket/experiments/websocketTest.tsx"
    click CP "https://github.com/Robotics-Lab-UCSB/webbased-robotics-frontend/tree/main/src/contexts/"
    click LP "https://github.com/Robotics-Lab-UCSB/webbased-robotics-frontend/blob/main/src/landingPage/homePage/homepage.tsx"
    click SI "https://github.com/Robotics-Lab-UCSB/webbased-robotics-frontend/blob/main/src/settingsPage/settingsPage.tsx"
    click TB "https://github.com/Robotics-Lab-UCSB/webbased-robotics-frontend/blob/main/src/taskbar/taskbar.tsx"
    click CI "https://github.com/Robotics-Lab-UCSB/webbased-robotics-frontend/tree/main/src/taskbar/chatbox/"
    click EC "https://github.com/Robotics-Lab-UCSB/webbased-robotics-frontend/tree/main/src/labComponents/FrankHertzMainComp/"
    click CS "https://github.com/Robotics-Lab-UCSB/webbased-robotics-frontend/blob/main/src/LABS/cameras/lab1Camera.tsx"
    click UI3D "https://github.com/Robotics-Lab-UCSB/webbased-robotics-frontend/tree/main/public/"
    click UIS "https://github.com/Robotics-Lab-UCSB/webbased-robotics-frontend/blob/main/src/raycasters/lab1Raycaster.tsx"
    click LC "https://github.com/Robotics-Lab-UCSB/webbased-robotics-frontend/blob/main/src/miscellaneous/controls/cameracontrol.tsx"

    %% Styles
    classDef frontend fill:#3498db,stroke:#2980b9,color:white
    classDef comm fill:#2ecc71,stroke:#27ae60,color:white
    classDef lab fill:#e67e22,stroke:#d35400,color:white
    classDef ai fill:#9b59b6,stroke:#8e44ad,color:white

    %% Legend
    subgraph Legend
        F[Frontend]:::frontend
        C[Communication]:::comm
        L[Lab Equipment]:::lab
        A[AI Components]:::ai
    end
```

## Memebers:

We currently have 10 memebers on the team from a variety of majors from EE to CS.

### Current Features:

- **Rendered and Functional Components**: Added dragging, rotating, and twisting functionalities for 8 individual lab components.
- **Board Functionality**: Implemented a board to provide an overview of the lab and interactions.
- **AI Chat Integration**: Added a chat-based AI to guide students to each lab equipment, offering assistance throughout the lab.
- **Component Placeholders**: Added placeholders to enable real-time updates to lab components as they are interacted with.

---

### How to Run This on Your Computer

Follow these steps to run iStat locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/istat-frontend.git
   ```

2. **Navigate into the project directory**:

   ```bash
   cd istat-frontend
   ```

3. **Install dependencies**:
   Make sure you have Node.js and npm installed. Then run:

   ```bash
   npm install
   ```

4. **Build for production**:
   To build the project for production, use:

   ```bash
   npm run dev
   ```

5. **Open the application**:
   Open your browser and navigate to:

```
http://localhost:3000
```

## Devenv instructions

Alternatively, `devenv` + [Nix](https://nixos.org/) can be used to
automatically bring up a working environment. Install Nix and enable the
experimental flakes feature. Enter the project directory and type

```bash
nix develop --impure
```

All dependencies will be fetched automatically. Once the command finishes, run

```bash
devenv up
```

A development server will be started at `localhost:5173`
