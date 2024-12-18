import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";
import CornerText from "../miscellaneous/2DTexts/2dText.tsx";
import ChatComponent from "../Assisstant/alltogether";
import CircularTherm from "../labComponents/SmallInstruments/circularTherm/ThermometerMainComponent.tsx";
import SmallKnob from "../labComponents/knobs/smallKnob.tsx";
import BigKnob from "../labComponents/knobs/currentKnob.tsx";
import Grid from "../miscellaneous/planks/grid.tsx";
import RaycastingComponent from "../raycasters/lab1Raycaster.tsx";
import LightSwitch from "../clickables/VVR_switch/switchAndCasing.tsx";
import DVM from "../labComponents/FrankHertzMainComp/digitalVoltmeter.tsx";
import { FrontFaceContextProvider } from "../contexts/frontFaceContext.tsx";
import { useFrontFaceContext } from "../hooks/useFrontFaceContext.tsx";
import TripleOutput from "../labComponents/FrankHertzMainComp/tripleOutPutPowerSupply/mainComponent.tsx";
import CurrentInstrument from "../labComponents/FrankHertzMainComp/currentInstrument.tsx";
import OakPlank from "../miscellaneous/planks/lightOak.tsx";
import FrankHertzMain from "../labComponents/FrankHertzMainComp/frankHertz.tsx";
import CurrentRegulator from "../labComponents/FrankHertzMainComp/currentRegulator.tsx";
import ControlsComponent from "../miscellaneous/controls/cameracontrol.tsx";
import VVR from "../labComponents/FrankHertzMainComp/VariableVoltageRegulator/mainframe.tsx";

interface CameraProps {
  xN: number
  yN: number
  zN: number
}

const Camera: React.FC<CameraProps> = ({ xN, yN, zN }) => {
  const frameCounter = useRef(0) // Counter for frames
  const interval = 60 // Check visibility every 60 frames (~1 second at 60 FPS)

  const { isFrontFaceVisible, setFrontFaceVisibility } = useFrontFaceContext()

  useFrame(({ camera }) => {
    frameCounter.current += 1

    if (frameCounter.current >= interval) {
      const isCameraBehind = camera.position.z < 0

      if (isCameraBehind && !isFrontFaceVisible) {
        setFrontFaceVisibility(true)
        console.log("Camera is behind: Dial is updating", isFrontFaceVisible)
      } else if (!isCameraBehind && isFrontFaceVisible) {
        setFrontFaceVisibility(false)
        console.log(
          "Camera is in front: Dial is not updating",
          isFrontFaceVisible,
        )
      }

      frameCounter.current = 0 // Reset the frame counter after 1 second
    }
  })

  return (
    <PerspectiveCamera
      makeDefault
      position={[xN, yN, zN]}
      fov={75}
      aspect={window.innerWidth / window.innerHeight}
      near={0.1}
      far={1000}
    />
  )
}

const GraphPaperComponent: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 50, z: 80 });
  const [key, setKey] = useState(0);
  const [reversedString, setReversedString] = useState<string | null>(null);
  
  const handleStubMessageClick = () => {
    setPosition({ x: 10, y: 10, z: 10 })
    setKey((prev) => prev + 1)
  }

  return (
    <Suspense
      fallback={<CornerText position="top-left" text="Loading your Lab..." />}
    >
      <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        <CornerText position="top-left" text="Frank-Hertz Lab" />
        <ChatComponent onMessageClicked={handleStubMessageClick} />
        {reversedString && (
          <div
            style={{ position: "absolute", top: 0, left: 0, color: "white" }}
          >
            {`Reversed: ${reversedString}`}
          </div>
        )}

        <Canvas
          gl={{ antialias: true }}
          onCreated={({ gl, scene }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping
            gl.toneMappingExposure = 0.7 // Reduce exposure for less intensity
            scene.environmentIntensity = 0.5 // Reduce environment lighting
          }}
        >
          {/* Raycasting Component */}
          <RaycastingComponent />

          {/* Camera and Thermometer */}
          <FrontFaceContextProvider>
            <Camera key={key} xN={position.x} yN={position.y} zN={position.z} />
          </FrontFaceContextProvider>

          {/* Ambient Light */}
          <Environment files="/environment/sky.hdr" background />
          <ambientLight intensity={1}/>

          {/* Controls */}
         <ControlsComponent />

          {/* Components: From Bottom to Top*/}
          <Grid />
          <TripleOutput position={[-22, -0.3, 22]} />
          <CurrentInstrument position={[27, 0.5, 0]} />
          <OakPlank />
          <FrankHertzMain position={[5, 12, 0]}/>
          <CurrentRegulator position={[40, 26, 5]}/>
          <DVM position={[20, 30, 23]} scale={[1.7, 1.7, 1.85]} unique_id="DVM_2"/>
          <VVR position={[-30, 24, 2]} />
          <DVM position={[30, 80, 8]} scale={[1.7, 1.7, 1.85]} rotation={[0, Math.PI, 0]} unique_id="DVM_1"/>
        </Canvas>
      </div>
    </Suspense>
  )
}

export default GraphPaperComponent
