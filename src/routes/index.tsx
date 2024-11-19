import { createBrowserRouter } from "react-router-dom"
import GraphPaperComponent from "../LABS/Lab1MainComponent"
import WebSocketComponent from "../Websocket/experiments/websocketTest"

const routers = createBrowserRouter([
  {
    path: "/",
    element: <GraphPaperComponent />, // Changed element to display "Test Test Test"
  },
  {
    path: "/websocketTest",
    element: <WebSocketComponent />,
  },
])

export default routers
