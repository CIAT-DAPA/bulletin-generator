import React, { useContext } from "react";
import "./Bulletin.css";
import backgroundSky from "../../assets/background.jpg";
import iccLogo from "../../assets/iccLogo.png";
import magaLogo from "../../assets/magaLogo.png";
import RainMapBulletin from "./RainMapBulletin";
import { FormDataContext } from "../../context/FormDataContext";

function Bulletin({ currentStep }) {
  const { formData } = useContext(FormDataContext);

  const renderBulletinContent = () => {
    // Supongamos que el paso 1 corresponde al "Mapa de lluvias"
    if (currentStep === 1) {
      return <RainMapBulletin />;
    }
    // Para otros pasos, podrías retornar otros componentes o contenido
    return (
      <div className="p-3">
        <h4>Other Bulletin Content</h4>
        <p>Content for step {currentStep}</p>
      </div>
    );
  };

  return (
    <div className="bulletin-container">
      <div className="bulletin-header d-flex justify-content-between align-items-center">
        <div>
          <img src={iccLogo} alt="Logo ICC" style={{ height: "25px" }} />
          <img src={magaLogo} alt="Logo MAGA" style={{ height: "25px" }} />
        </div>
        <span>Edición 72 - Nov. 2024</span>
      </div>
      <div
        className="bulletin-body"
        style={{
          backgroundImage: `url(${backgroundSky})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {renderBulletinContent()}
      </div>
      <div className="bulletin-footer d-flex justify-content-between align-items-center">
        <div>
          <strong>Santa Rosa</strong>
        </div>
        <span>1 de 5</span>
      </div>
    </div>
  );
}

export default Bulletin;
