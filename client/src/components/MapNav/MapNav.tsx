import i_logout from "../../assets/i_logout.png";
import i_plus from "../../assets/i_plus.png";
import i_minus from "../../assets/i_minus.png";
import i_center from "../../assets/i_center.png";
import React from "react";

interface MapNav {
  setModalLogout: () => void;
}

const MapNav: React.FC<MapNav> = ({ setModalLogout }) => {
  return (
    <div className="h-full p-2 relative pointer-events-none">
      <div className="nav w-full h-full relative z-10">
        <button
          className="absolute top-0 left-0 flex justify-center items-center pointer-events-auto bg-white/85 rounded-xl h-10 w-10"
          onClick={() => setModalLogout()}
        >
          <img className="i_img" src={i_logout} alt="Профиль" />
        </button>

        <div className="absolute bottom-10 right-0 mb-6 flex flex-col gap-2 items-center pointer-events-auto">
          <button className="flex justify-center items-center bg-white/85 rounded-xl h-10 w-10">
            <img className="i_img" src={i_plus} alt="Увеличить масштаб" />
          </button>
          <button className="flex justify-center items-center bg-white/85 rounded-xl h-10 w-10">
            <img className="i_img" src={i_minus} alt="Уменьшить масштаб" />
          </button>

          <button className="flex justify-center items-center mt-2 bg-white/85 rounded-full h-11 w-11">
            <img className="i_img" src={i_center} alt="Центрировать на метке" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapNav;
