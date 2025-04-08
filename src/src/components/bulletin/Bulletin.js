import React, { useContext } from "react";
import "./Bulletin.css";
import bgDay from "../../assets/bgDay.jpg";
import bgNight from "../../assets/bgNight.jpg";
import iccLogo from "../../assets/iccLogo.png";
import magaLogo from "../../assets/magaLogo.png";
import RainMapBulletin from "./RainMapBulletin";
import { FormDataContext } from "../../context/FormDataContext";
import LunarCalendarBulletin from "./LunarCalendarBulletin";

function Bulletin({ currentStep, totalSteps }) {
  const { formData } = useContext(FormDataContext);

  const renderBulletinContent = () => {
    if (currentStep === 2) {
      return <RainMapBulletin />;
    }
    if (currentStep === 3) {
      return <LunarCalendarBulletin />;
    }
    return <div className="p-3"></div>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Fecha no disponible";
    const date = new Date(dateString + "T00:00:00");
    let month = date
      .toLocaleString("es-ES", { month: "short" })
      .replace(".", "");
    month = month.charAt(0).toUpperCase() + month.slice(1);
    return `${month}/${date.getFullYear()}`;
  };

  return (
    <div className="bulletin-container" id="bulletinCapture">
      <div className="bulletin-header d-flex justify-content-between align-items-center">
        <div>
          <img src={iccLogo} alt="Logo ICC" style={{ height: "25px" }} />
          <img src={magaLogo} alt="Logo MAGA" style={{ height: "25px" }} />
        </div>
        <span>
          Emisión: {formatDate(formData.emissionDate) || "{fecha de emisión}"}
        </span>
      </div>
      <div
        className="bulletin-body"
        style={{
          backgroundImage:
            currentStep === 3 ? `url(${bgNight})` : `url(${bgDay})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {renderBulletinContent()}
      </div>
      <div className="bulletin-footer d-flex justify-content-between align-items-center">
        <div>
          <strong className="text-capitalize">
            {formData.cityName || "{municipio}"}
          </strong>
        </div>
        <span>
          {currentStep - 1} de {totalSteps - 1}
        </span>
      </div>
    </div>
  );
}

export default Bulletin;
