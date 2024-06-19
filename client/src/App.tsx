import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./pages/Auth";
import MapPage from "./pages/MapPage";
import Registr from "./pages/Registr";
import { Context, store } from "./context";
import { observer } from "mobx-react-lite";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Loader from "./components/Loader/Loader";

export default observer(function App() {
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      store.setIsAuth(true);
    } else {
      store.setIsAuth(false);
    }
  }, [store.isAuth]);

  useEffect(() => {
    store.setIsLoading(false);
  }, [store.isLoading]);

  if (store.isLoading)
    return (
      <div className="w-full h-full absolute top-0 left-0 z-[1000] bg-slate-400">
        <div className="w-full h-full flex justify-center items-center bg-slate-400">
          <Loader />
        </div>
      </div>
    );

  return (
    <Router>
      <Context.Provider value={{ store }}>
        <Routes>
          {store.isAuth ? (
            <>
              <Route path="/" element={<MapPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Auth />} />
              <Route path="/reg" element={<Registr />} />
              <Route path="/forgotPass" element={<Auth />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      </Context.Provider>
    </Router>
  );
});
