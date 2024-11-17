import { useLocation } from "react-router-dom";

import { useCallback, useEffect, useRef } from "react";
import NavBar from "../AboutPageComponents/navBar";
import WhatIsIt from "../AboutPageComponents/WhatIsIt";
import Technologies from "../AboutPageComponents/Technologies";
import Creator from "../AboutPageComponents/Creator";
import Footer from "../AboutPageComponents/footer";

const About = () => {
  let location = useLocation();
  let scrollRef = useRef(null);
  const scrollToSection = useCallback((sectionId) => {
    if (scrollRef.current) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "end", 
        });
      }
    }
  }, []);

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    switch (path) {
      case "WhatIsIt":
        scrollToSection("WhatIsIt");
        break;
      case "Technologies":
        scrollToSection("Technologies");
        break;
      case "Creator":
        scrollToSection("Creator");
        break;
      default:
        break;
    }
  }, [location]);

  return (
    <div
      ref={scrollRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "scroll",
        overflowX: "hidden",
        height: "100vh",
        width: "100vw",
        justifyContent: "space-between",
      }}
    >
      <NavBar />
      <WhatIsIt />
      <Technologies />
      <Creator />
      <div
        style={{
          marginTop: 200,
        }}
      >
        <Footer />
      </div>
    </div>
  );
};

export default About;
