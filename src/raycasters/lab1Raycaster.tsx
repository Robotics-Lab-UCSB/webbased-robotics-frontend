import React, { useRef, useEffect, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const RaycastingComponent: React.FC = () => {
  const raycasterRef = useRef(new THREE.Raycaster())
  const mouseRef = useRef(new THREE.Vector2())
  const { camera, scene, gl } = useThree()
  const [isMouseDown, setIsMouseDown] = useState(false)

  const currentAngleRef = useRef<number>(0)
  const previousAngleRef = useRef<number>(-1)
  const previousSpinning = useRef<THREE.Object3D | null>(null)
  const intersectsRef = useRef<THREE.Intersection[]>([])
  // const lastIntersectedObjectUpdateTimeRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect()
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    }

    const handleMouseDown = (event: MouseEvent) => {
      if (event.button === 0) {
        setIsMouseDown(true)
        if (intersectsRef.current.length > 0) {
          const intersectedObject = intersectsRef.current[0].object
          console.log(intersectedObject.userData.type)
          if (intersectedObject.userData.type == "triangle_circle_button" || intersectedObject.userData.type == "switch_button") {
            intersectedObject.userData.handleIntersect();
          }
        }
      }
    }

    const handleMouseUp = (event: MouseEvent) => {
      if (event.button === 0) setIsMouseDown(false)
    }

    gl.domElement.addEventListener("mousemove", handleMouseMove)
    gl.domElement.addEventListener("mousedown", handleMouseDown)
    gl.domElement.addEventListener("mouseup", handleMouseUp)

    return () => {
      gl.domElement.removeEventListener("mousemove", handleMouseMove)
      gl.domElement.removeEventListener("mousedown", handleMouseDown)
      gl.domElement.removeEventListener("mouseup", handleMouseUp)
    }
  }, [gl])

  useFrame(() => {
    raycasterRef.current.setFromCamera(mouseRef.current, camera)
    raycasterRef.current.params.Points.threshold = 0.1
    intersectsRef.current = raycasterRef.current.intersectObjects(
      scene.children,
      true,
    )
    if (isMouseDown) {
      if (intersectsRef.current.length > 0) {
        const intersectedObject = intersectsRef.current[0].object
        const intersectionPoint = intersectsRef.current[0].point
        const localPoint = intersectedObject.worldToLocal(
          intersectionPoint.clone(),
        )
        let angle = 0
        if (intersectedObject.userData.type === "VVR_knob") {
          angle = Math.atan2(localPoint.x, localPoint.z)
        } else if (intersectedObject.userData.type === "lab1smallknob") {
          angle = Math.atan2(localPoint.x, localPoint.z)
        } else if (
          intersectedObject.userData.type === "current_knob"
        ) {
          angle = Math.atan2(localPoint.x, localPoint.z)
        }

        let deltaAngle
        if (previousSpinning.current !== intersectedObject) {
          // THIS PART IF USER STARTS DRAGGING ACROSS
          previousAngleRef.current = angle
          deltaAngle = 0
          previousSpinning.current = intersectedObject
        } else {
          currentAngleRef.current = angle
          deltaAngle = previousAngleRef.current - currentAngleRef.current
          previousAngleRef.current = currentAngleRef.current
        }

        if (deltaAngle > Math.PI) {
          deltaAngle -= 2 * Math.PI
        } else if (deltaAngle < -Math.PI) {
          deltaAngle += 2 * Math.PI
        }
        if (intersectedObject.userData.type === "lab1smallknob") {
          // CHECK FOR DIFFERENT ADDING ANGLE IMPLEMENTATIONS
          if (intersectedObject) {
            intersectedObject.rotation.y -= deltaAngle * 0.34
            intersectedObject.userData.backendUpdate()
          }
        } else if (intersectedObject.userData.type === "VVR_knob") {
          if (intersectedObject) {
            intersectedObject.rotation.y -= deltaAngle * 0.4
          }
        } else if (
          intersectedObject.userData.type === "current_knob"
        ) {
          if (intersectedObject) {
            intersectedObject.rotation.y -= deltaAngle * 0.34
          }
        } else {
          previousSpinning.current = null
        }
      }
    } else {
      previousSpinning.current = null
    }
  })

  return null
}

export default RaycastingComponent
