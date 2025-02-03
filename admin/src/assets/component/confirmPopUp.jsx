/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function ConfirmPopUp({ open, onClose, children }) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${
        open ? "visible" : "hidden"
      }`}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all duration-300 ${
          open ? "scale-100 opacity-100" : "scale-150 opacity-0"
        }`}>
        {children}
      </div>
    </div>
  );
}

export default ConfirmPopUp;
