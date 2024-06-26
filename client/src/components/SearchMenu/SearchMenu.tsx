import { useState } from "react";

import i_close12 from "@/assets/i_close12.png";
import i_favout from "@/assets/i_favout.png";
import i_search from "@/assets/i_search.png";

interface SearchMenu {
  setModalFav: () => void;
  setModalSearchMenu: () => void;
}

const SearchMenu: React.FC<SearchMenu> = ({
  setModalFav,
  setModalSearchMenu,
}) => {
  const handleClick = () => {
    setModalSearchMenu();
  };

  return (
    <div className="w-full sm:min-w-96 sm:max-w-lg py-3 px-3 absolute bottom-0 left-1/2 -translate-x-1/2 z-40 bg-white flex items-center justify-center rounded-t-xl">
      <div className="w-full flex items-center justify-between">
        <button
          className="flex justify-center items-center -ml-2 h-10 w-10"
          onClick={handleClick}
        >
          <img className="i_img" src={i_search} alt="Поиск" />
        </button>

        <div className="relative flex-grow">
          <input
            onClick={handleClick}
            type="text"
            className="w-full rounded-lg py-2 px-4 text-sm border border-gray-300 bg-gray-100 text-black font-medium caret-blue-500"
          />
        </div>

        <button
          className="flex justify-center items-center -mr-2 h-10 w-10"
          onClick={setModalFav}
        >
          <img className="i_img" src={i_favout} alt="Избранное" />
        </button>
      </div>
    </div>
  );
};

export default SearchMenu;
