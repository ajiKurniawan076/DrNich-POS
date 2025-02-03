import React, { forwardRef } from "react";

const Input = forwardRef(({ placeholder, type }, ref) => {
  return (
    <input
      ref={ref} // Pastikan ref diteruskan ke elemen input
      type={type}
      placeholder={placeholder}
      className="h-10 w-full px-3 py-2 border rounded-md border-yellow-600 focus:outline-none focus:ring-1 focus:ring-yellow-600"
    />
  );
});

export default Input;
