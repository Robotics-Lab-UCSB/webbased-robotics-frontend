import { createBrowserRouter } from "react-router-dom"
import GraphPaperComponent from "../LABS/Lab1MainComponent"
import WebSocketComponent from "../Websocket/experiments/websocketTest"
import MainPage from "../landingPage/mainpage"

const routers = createBrowserRouter([
  {
    path: "/",
    element: <GraphPaperComponent />, // Changed element to display "Test Test Test"
  },
  {
    path: "/websocketTest",
    element: <WebSocketComponent />,
  },
  {
    path: "/landingPage",
    element: <MainPage />,
  },
])

export default routers
