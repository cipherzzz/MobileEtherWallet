
import { Provider } from "react-redux";

import { configureStore } from "./Store";
import { registerScreens } from "./Screens";
import Navigation from "./Navigation";


// --------------------------------------
// Startup Operations
// --------------------------------------

export default function App() {
  const store = configureStore();

  registerScreens(store, Provider);

  // start the app
  Navigation.init();
}

