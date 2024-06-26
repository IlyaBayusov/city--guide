import { useContext, useEffect, useState } from "react";

import MapItem from "../components/Map/MapItem";
import MapNav from "../components/MapNav/MapNav";
import ModalFavorits from "../components/ModalFavorits/ModalFavorits";
import ModalLogout from "../components/ModalLogout/ModalLogout";
import SearchMenu from "../components/SearchMenu/SearchMenu";
import { Context } from "../context";
import ModalSearchMenu from "../components/ModalSearchMenu/ModalSearchMenu";

export default function MapPage() {
  const [modalLogout, setModalLogout] = useState(false);
  const [modalFav, setModalFav] = useState(false);
  const [modalSearchMenu, setModalSearchMenu] = useState(false);
  const [coords, setCoords] = useState([]);
  const [userLocation, setUserLocation] = useState<number[]>([]);

  const { store } = useContext(Context);

  const toggleSetModalFav = () => {
    setModalFav(!modalFav);
  };
  const toggleSetModalLogout = () => {
    setModalLogout(!modalLogout);
  };
  const toggleSetModalSearchMenu = () => {
    setModalSearchMenu(!modalSearchMenu);
  };

  return (
    <>
      <div className="wrapper relative">
        <MapNav setModalLogout={toggleSetModalLogout} />

        <div className="map1 flex justify-center items-center h-full w-full absolute top-0 left-0 z-0 bg-slate-400">
          <div id="map"></div>
          <MapItem />
        </div>

        {/* нижнее меню */}
        <SearchMenu
          setModalFav={toggleSetModalFav}
          setModalSearchMenu={toggleSetModalSearchMenu}
        />

        {/* модальное нижнее меню */}
        <ModalSearchMenu
          modalSearchMenu={modalSearchMenu}
          setModalSearchMenu={toggleSetModalSearchMenu}
        />

        {/* модальное окно избранных */}
        <ModalFavorits modalFav={modalFav} setModalFav={toggleSetModalFav} />

        {/* модальное окно выхода*/}
        <ModalLogout
          modalLogout={modalLogout}
          setModalLogout={toggleSetModalLogout}
        />
      </div>
    </>
  );
}
