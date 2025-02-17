import { useState, useEffect } from "react";

function useDeviceType() {
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const tablet = window.matchMedia(
      "(min-width: 768px) and (max-width: 1023px)"
    );

    const updateDeviceType = () => {
      if (mobile.matches) {
        setDeviceType("mobile");
      } else if (tablet.matches) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    updateDeviceType();
    mobile.addEventListener("change", updateDeviceType);
    tablet.addEventListener("change", updateDeviceType);

    return () => {
      mobile.removeEventListener("change", updateDeviceType);
      tablet.removeEventListener("change", updateDeviceType);
    };
  }, []);

  return deviceType;
}

export default useDeviceType;
