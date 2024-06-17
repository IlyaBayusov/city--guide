import React from "react";

interface ModalLogout {
  modalLogout: boolean;
  setModalLogout: () => void;
}

const ModalLogout: React.FC<ModalLogout> = ({
  modalLogout,
  setModalLogout,
}) => {
  return (
    <div
      className={
        "w-full h-full flex justify-center items-center absolute top-0 left-0 z-[1000] transition-opacity duration-100 bg-black/50 " +
        (modalLogout
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none")
      }
      onClick={() => setModalLogout()}
    >
      <div
        className="px-8 py-4 flex flex-col items-center bg-white rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-semibold text-sm mb-6">Вы хотите выйти?</p>

        <div className="w-full flex justify-around items-center">
          <button
            className="bg-gray-300 w-14 py-2 text-sm font-semibold rounded-lg"
            onClick={() => setModalLogout()}
          >
            Да
          </button>
          <button
            className="bg-gray-300 w-14 py-2 text-sm font-semibold rounded-lg"
            onClick={() => {
              setModalLogout();
              //Logout
            }}
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalLogout;
