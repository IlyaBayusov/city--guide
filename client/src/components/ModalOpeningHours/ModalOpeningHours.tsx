import React, { useContext, useEffect, useState } from "react";
import i_close24 from "@/assets/i_close24.png";
import { Context } from "../../context";
import { IPlaceInfo } from "../../models/IPlaceInfo";
import { verifyPasswordResetCode } from "firebase/auth";

type Props = {
  modalOpeningHours: boolean;
  setModalOpeningHours: () => boolean;
};

export default function ModalOpeningHours({
  modalOpeningHours,
  setModalOpeningHours,
}: Props) {
  const { placeInfo } = useContext(Context) as { placeInfo: IPlaceInfo };

  return (
    <div
      className={
        "w-full h-full absolute top-0 left-0 z-[70] transition-all duration-200 " +
        (modalOpeningHours ? "opacity-100" : "opacity-0 pointer-events-none")
      }
      onClick={setModalOpeningHours}
    >
      <div className="relative w-full h-full ">
        <div
          className={
            "w-full h-full absolute top-0 left-0 bg-black/50 transition-all duration-200 " +
            (modalOpeningHours ? "" : "")
          }
        ></div>

        <div
          className={
            "absolute bottom-0 left-1/2 -translate-x-1/2 w-full sm:min-w-96 sm:max-w-lg flex flex-col bg-white py-4 px-4 rounded-t-xl transition-all duration-200 " +
            (modalOpeningHours ? "translate-y-0" : "translate-y-full")
          }
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-3 flex items-start justify-between -mr-1">
            <p className="max-w-72 text-left text-sm font-semibold">
              График работы
            </p>

            <button
              className="flex justify-center items-center"
              onClick={setModalOpeningHours}
            >
              <img src={i_close24} />
            </button>
          </div>

          <div className=""></div>
        </div>
      </div>
    </div>
  );
}
