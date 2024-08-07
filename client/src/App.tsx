import "./App.css";

import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
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
import { locMinsk, radius } from "./constans/constans";
import { IPlaceInfo } from "./models/IPlaceInfo";

export default observer(function App() {
  const [isLoader, setIsLoader] = useState(true);
  const [isLoadedMap, setIsLoadedMap] = useState(false);
  const [mapCenter, setMapCenter] = useState(locMinsk);
  const [userCenter, setUserCenter] = useState({});
  const [zoom, setZoom] = useState(9);
  const [arrCategoriesTypes, setArrCategoriesTypes] = useState([]);
  const [inputRadius, setInputRadius] = useState(radius);
  const [places, setPlaces] = useState([]);
  const [placeInfo, setPlaceInfo] = useState<IPlaceInfo | object>({});

  const [modalSearchMenu, setModalSearchMenu] = useState(false);

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
          inputRadius,
          setInputRadius,
          places,
          setPlaces,
          placeInfo,
          setPlaceInfo,
          userCenter,
          setUserCenter,
          modalSearchMenu,
          setModalSearchMenu,
          isLoadedMap,
          setIsLoadedMap,
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
