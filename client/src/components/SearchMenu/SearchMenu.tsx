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
  const [inputSearch, setInputSearch] = useState("");
  const [isClose, setIsClose] = useState(false);

  return (
    <div className="w-full sm:min-w-96 sm:max-w-lg py-3 px-3 absolute bottom-0 left-1/2 -translate-x-1/2 z-40 bg-white flex items-center justify-center rounded-t-xl">
      <div className="w-full flex items-center justify-between">
        <button
          className="flex justify-center items-center -ml-2 h-10 w-10"
          onClick={setModalSearchMenu}
        >
          <img className="i_img" src={i_search} alt="Поиск" />
        </button>

        <div className="relative flex-grow">
          <input
            type="text"
            className="w-full rounded-lg py-2 px-4 text-sm bg-gray-300 text-black font-medium caret-blue-500"
            onChange={(e) => {
              if (e.target.value) {
                setInputSearch(e.target.value);
                setIsClose(true);
              } else {
                setInputSearch(e.target.value);
                setIsClose(false);
              }
            }}
            onClick={setModalSearchMenu}
            value={inputSearch}
          />
          <button
            className={
              "absolute mr-2 p-1 top-1/2 right-0 -translate-y-1/2 z-20 bg-gray-600 rounded-md transition duration-75 cursor-pointer " +
              (isClose ? "opacity-100" : "opacity-0")
            }
            onClick={() => {
              setIsClose(false);
              setInputSearch("");
            }}
          >
            <img src={i_close12} />
          </button>
        </div>

        <button
          className="flex justify-center items-center -mr-2 h-10 w-10"
          onClick={() => {
            setModalFav();
          }}
        >
          <img className="i_img" src={i_favout} alt="Избранное" />
        </button>
      </div>
    </div>
  );
};

export default SearchMenu;
