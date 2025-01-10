import { createBrowserRouter } from "react-router-dom"
import GraphPaperComponent from "../LABS/Lab1MainComponent"
import WebSocketComponent from "../Websocket/experiments/websocketTest"
import RegisterPage from "../landingPage/loginPage/loginPage"
import Dashboard from "../landingPage/homePage/homepage"
import ProtectedLabRoute from "../landingPage/protectedLabroute"

const routers = createBrowserRouter([
  {
    path: "/lab/:labId",
    element: (
      <ProtectedLabRoute>
        <GraphPaperComponent />
      </ProtectedLabRoute>
    ),
  },
  {
    path: "/websocketTest",
    element: <WebSocketComponent />,
  },
  {
    path: "/register",
    element: <RegisterPage />, // Assuming AuthPage handles both register and login
  },
  {
    path: "/login",
    element: <RegisterPage />, // Render the same component for login
  },
  {
    path: "/home",
    element: <Dashboard />,
  }
])

export default routers
