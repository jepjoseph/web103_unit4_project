import { useRoutes } from "react-router-dom";

import Navigation from "./components/Navigation";
import CreateSwitch from "./pages/CreateSwitch";
import ViewSwitches from "./pages/ViewSwitches";
import SwitchDetails from "./pages/SwitchDetails";
import EditSwitch from "./pages/EditSwitch";

import "./App.css";

function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <CreateSwitch />,
    },
    {
      path: "/switches",
      element: <ViewSwitches />,
    },
    {
      path: "/switches/:id",
      element: <SwitchDetails />,
    },
    {
      path: "/switches/:id/edit",
      element: <EditSwitch />,
    },
  ]);

  return (
    <div className="app">
      <Navigation />
      {element}
    </div>
  );
}

export default App;
