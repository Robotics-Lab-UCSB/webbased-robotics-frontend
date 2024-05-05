import { createBrowserRouter } from "react-router-dom";
import GraphPaperComponent from "../LabCubes/cube";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <GraphPaperComponent /> , // Changed element to display "Test Test Test"
  },
]);

export default routers;