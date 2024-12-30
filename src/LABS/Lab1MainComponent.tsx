import React, { useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";
import CornerText from "../miscellaneous/2DTexts/2dText.tsx";
import Grid from "../miscellaneous/planks/grid.tsx";
import RaycastingComponent from "../raycasters/lab1Raycaster.tsx";
import DVM from "../labComponents/FrankHertzMainComp/digitalVoltmeter.tsx";
import TripleOutput from "../labComponents/FrankHertzMainComp/tripleOutPutPowerSupply/mainComponent.tsx";
import CurrentInstrument from "../labComponents/FrankHertzMainComp/currentInstrument.tsx";
import OakPlank from "../miscellaneous/planks/lightOak.tsx";
import FrankHertzMain from "../labComponents/FrankHertzMainComp/frankHertz.tsx";
import CurrentRegulator from "../labComponents/FrankHertzMainComp/currentRegulator.tsx";
import ControlsComponent from "../miscellaneous/controls/cameracontrol.tsx";
import VVR from "../labComponents/FrankHertzMainComp/VariableVoltageRegulator/mainframe.tsx";
import FloatingSquare from "../taskbar/mainBlock.tsx";
import { CameraProvider } from "../contexts/cameraPositionContext.tsx";
import Lab1Camera from "./cameras/lab1Camera.tsx";

const GraphPaperComponent: React.FC = () => {
  return (
    <Suspense
      fallback={<CornerText position="top-left" text="Loading your Lab..." />}
    >
      <CameraProvider>

      <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        <CornerText position="top-left" text="Frank-Hertz Lab" />
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
          <Lab1Camera/>

          {/* Ambient Light */}
          <Environment files="/environment/sky.hdr" background />
          <ambientLight intensity={1}/>

          {/* Controls */}
         {/* <ControlsComponent /> */}

          {/* Components: From Bottom to Top*/}
          <Grid />
          <TripleOutput position={[-22, -0.3, 22]} />
          <CurrentInstrument position={[27, 0.5, 0]} />
          <OakPlank />
          <FrankHertzMain position={[5, 12, 0]}/>
          <CurrentRegulator position={[40, 26, 5]}/>
          <DVM position={[20, 30, 23]} scale={[1.7, 1.7, 1.85]} unique_id="DVM_2"/>
          <VVR position={[-30, 24, 2]} />
          <DVM position={[30, 80, 8]} scale={[1.7, 1.7, 1.85]} rotation={[0, Math.PI, 0]} unique_id="DVM_1"/>        </Canvas>
      </div>
      </CameraProvider>
    </Suspense>
  )
}

export default GraphPaperComponent
