import React from "react";
import iccLogo from "../../assets/logoIcc.jpg";
import allianceLogo from "../../assets/logoCGIAR.jpg";
import magaLogo from "../../assets/logoMaga.png";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">
        <h5>Socios del Proyecto</h5>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          <img
            src={iccLogo}
            alt="ICC"
            className="m-2"
            style={{ maxWidth: "100px" }}
          />
          <img
            src={magaLogo}
            alt="MAGA"
            className="m-2 bg-white"
            style={{ maxWidth: "120px" }}
          />
          <img
            src={allianceLogo}
            alt="Alliance CGIAR"
            className="m-2 bg-white"
            style={{ maxWidth: "120px" }}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
