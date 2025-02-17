/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function ConfirmPopUp({ open, onClose, children }) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center lg:justify-start items-center ${
        open ? "visible" : "hidden"
      }`}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={` rounded-xl shadow transition-all duration-300 ${
          open ? "scale-100 opacity-100" : "scale-150 opacity-0"
        }`}>
        {children}
      </div>
    </div>
  );
}

export default ConfirmPopUp;
