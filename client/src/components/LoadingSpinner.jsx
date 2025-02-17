import React from "react";

function LoadingSpinner() {
  return (
    <>
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary shadow-primary drop-shadow-sm"></div>
      </div>
    </>
  );
}

export default LoadingSpinner;
