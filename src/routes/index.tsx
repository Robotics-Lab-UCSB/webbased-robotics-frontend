import { createBrowserRouter } from "react-router-dom";
import GraphPaperComponent from "../LabCubes/cube";
import WebSocketComponent from "../labComponents/labsocket";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <GraphPaperComponent /> , // Changed element to display "Test Test Test"
  },
  {
    path:"/hi",
    element: <WebSocketComponent />,
  },
]);

export default routers;