import React, { useEffect, useState } from "react"
import ButtonComponent from "./buttonsMain"

interface Button {
  id: string
  unique_id: string
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  type: string
  key: string
  typeGen?: string;
}

interface ParentComponentProps {
  distanceBetweenSmallButton?: number
  distanceBetweenBigButton?: number
  rot?: [number, number, number]
  position?: [number, number, number]
  scale?: [number, number, number]
}

const ParentComponent: React.FC<ParentComponentProps> = ({
  distanceBetweenSmallButton = 3.32,
  distanceBetweenBigButton = 3.5,
  rot = [0, 0, 0],
  position = [0, 0, 0],
  scale = [0.8, 0.8, 0.8],
}) => {
  const [buttons, setButtons] = useState<Button[]>([])

  useEffect(() => {
    // Create small buttons row
    const smallButtons = Array.from({ length: 8 }, (_, i) => ({
      unique_id: `eletrometer_smallButton_${i + 1}`,
      id: `smallButton${i + 1}`,
      key: `smallButton${i + 1}`,
      position: [
        position[0] - 80.7 + distanceBetweenSmallButton * (i + 1),
        position[1] + 33,
        position[2] - 5.8,
      ] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      scale: [0.124, 0.124, 0.124] as [number, number, number],
      type: "type1",
    }))

    // Create big buttons for two rows
    const bigButtonsRow1 = Array.from({ length: 4 }, (_, i) => ({
      unique_id: `eletrometer_longButton_${i + 1}`,
      id: `bigButton${i + 1}`,
      key: `bigButton${i + 1}`,
      position: [
        position[0] + distanceBetweenBigButton * (i + 1),
        position[1],
        position[2],
      ] as [number, number, number],
      rotation: rot,
      scale: [0.07, 0.07, 0.07] as [number, number, number],
      type: "type2",
    }))

    const bigButtonsRow2 = Array.from({ length: 4 }, (_, i) => ({
      unique_id: `eletrometer_longButton_${5 + i}`,
      id: `bigButton${i + 5}`,
      key: `bigButton${i + 5}`,
      position: [
        position[0] + distanceBetweenBigButton * (i + 1),
        position[1] - 1.2,
        position[2],
      ] as [number, number, number],
      rotation: rot,
      scale: [0.07, 0.07, 0.07] as [number, number, number],
      type: "type2",
    }))

    // Small buttons column
    // const smallButtonCol = Array.from({ length: 3 }, (_, i) => ({
    //   unique_id: `eletrometer_smallButton_${i + 9}`,
    //   id: `smallButton${i + 9}`,
    //   key: `smallButton${i + 9}`,
    //   position: [
    //     position[0] + 0.9,
    //     position[1] + 1.6 - i * 1.5,
    //     position[2],
    //   ] as [number, number, number],
    //   rotation: rot,
    //   scale: [0.05, 0.05, 0.05] as [number, number, number],
    //   type: "type1",
    // }));

    // Triangle and big button column
    const triangleAndBigButtonCol = Array.from({ length: 3 }, (_, i) => {
      const types = ["type1", "type2", "type1"]
      const scales = [
        [0.2, 0.2, 0.2],
        [0.05, 0.05, 0.05],
        [0.2, 0.2, 0.2],
      ]
      const rotations = [[-Math.PI / 2, 0, 0], rot, [Math.PI / 2, 0, 0]]
      return {
        unique_id: `columnButton_${"type2"}_${i + 1}`,
        id: `columnButton${i + 1}`,
        key: `columnButton${i + 1}`,
        position: [
          position[0] + 17.3,
          position[1] + 1.5 - i * 1.2,
          position[2] - 0.2,
        ] as [number, number, number],
        rotation: rotations[i] as [number, number, number],
        scale: scales[i] as [number, number, number],
        type: types[i],
        typeGen: "triangleButton", 
      }
    })

    // Combine all buttons
    setButtons([
      ...smallButtons,
      ...bigButtonsRow1,
      ...bigButtonsRow2,
      ...triangleAndBigButtonCol,
    ])
  }, [distanceBetweenSmallButton, distanceBetweenBigButton, rot, position])

  return (
    <mesh position={position} scale={scale} rotation={[Math.PI / 2, 0, 0]}>
      <ButtonComponent buttons={buttons} />
    </mesh>
  )
}

export default ParentComponent
