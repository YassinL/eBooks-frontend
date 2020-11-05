import React, { useEffect, useState } from "react";
import MobileNavBar from "../organisms/MobileNavBar/MobilieNavBar";
import DesktopNavBar from "../organisms/DesktopNavBar/DesktopNavBar";

const NavResponsive = () => {
  const [isMobile, setMobile] = useState(window.innerWidth < 769);

  const updateMedia = () => {
    setMobile(window.innerWidth < 769);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  if (isMobile) {
    return <MobileNavBar />;
  }
  return <DesktopNavBar />;
};

export default NavResponsive;
