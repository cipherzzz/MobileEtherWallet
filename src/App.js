import { Provider } from 'react-redux';

import { configureStore } from './Store';
import { registerScreens } from './Screens';
import Navigation from './Navigation';
import { loadIcons } from './util/Icons';
//import '../shim'

// --------------------------------------
// Startup Operations
// --------------------------------------

export default function App() {
  const store = configureStore();

  registerScreens(store, Provider);

  Promise.all([loadIcons]).then(() => {
    // start the app
    Navigation.init();
  });
}
