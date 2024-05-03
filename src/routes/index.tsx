import DraggableCube from "../shared/cube";
import { createBrowserRouter } from "react-router-dom";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <DraggableCube /> , // Changed element to display "Test Test Test"
  },
]);

export default routers;