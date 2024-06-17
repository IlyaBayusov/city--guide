import { createContext, useState } from "react";
import "./App.css";
import Auth from "./pages/Auth";
import MapPage from "./pages/MapPage";
import Registr from "./pages/Registr";
import { Context } from "./context";
import { observer } from "mobx-react-lite";
import Store from "./Store/Store";

// interface State {
//   store: Store;
// }

// const store = new Store();

export default observer(function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Context.Provider value={{ isLoading, setIsLoading }}>
        <MapPage />
        {/* <Auth /> */}
        {/* <Registr /> */}
      </Context.Provider>
    </>
  );
});
