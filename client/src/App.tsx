import "./App.css";

import { observer } from "mobx-react-lite";
import { createContext, useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Loader from "./components/Loader/Loader";
import { Context, store } from "./context/index";
import Auth from "./pages/Auth";
import MapPage from "./pages/MapPage";
import Registr from "./pages/Registr";

export default observer(function App() {
  const [isLoader, setIsLoader] = useState(true);
  const [mapCenter, setMapCenter] = useState({
    lat: 53.9,
    lng: 27.56,
  });
  const [zoom, setZoom] = useState(9);
  const [arrCategoriesTypes, setArrCategoriesTypes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      store.setIsAuth(true);
    } else {
      store.setIsAuth(false);
    }
  }, [store.isAuth]);

  useEffect(() => {
    setIsLoader(false);
  }, []);

  const main = "/";
  const reg = "/reg";
  const login = "/login";
  const forgotPass = "/forgotPass";

  if (isLoader)
    return (
      <div className="w-full h-full absolute top-0 left-0 z-[1000] bg-slate-400">
        <div className="w-full h-full flex justify-center items-center bg-slate-400">
          <Loader />
        </div>
      </div>
    );

  return (
    <Router>
      <Context.Provider
        value={{
          store,
          mapCenter,
          setMapCenter,
          zoom,
          setZoom,
          arrCategoriesTypes,
          setArrCategoriesTypes,
        }}
      >
        <Routes>
          {store.isAuth ? (
            <>
              <Route path={main} element={<MapPage />} />
              <Route path="*" element={<Navigate to={main} replace />} />
            </>
          ) : (
            <>
              <Route path={login} element={<Auth />} />
              <Route path={reg} element={<Registr />} />
              <Route path={forgotPass} element={<Auth />} />
              <Route path="*" element={<Navigate to={login} replace />} />
            </>
          )}
        </Routes>
      </Context.Provider>
    </Router>
  );
});
