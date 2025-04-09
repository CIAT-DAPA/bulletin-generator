import React, { useContext } from "react";
import { FormDataContext } from "../../context/FormDataContext";
import lluviaIco from "../../assets/lluviaIco.png";

function RecommendationBulletin() {
  const { formData } = useContext(FormDataContext);
  return (
    <div className="d-flex flex-column justify-content-start h-100 p-2 gap-0">
      {/* Sección Superior */}
      <div className="text-center d-flex justify-content-around align-items-center bg-dark-transparent text-white rounded-1 px-4 py-2">
        <div>
          <img src={lluviaIco} alt="Lluvia" style={{ height: "38px" }} />
        </div>
        <div>
          <div className="bg-comunitario text-end rounded-1 px-1">
            <span className="fs-7">El Boletín Comunitario</span>
          </div>
          <h4 className="m-0 fw-light">
            <span className="fw-bold text-uppercase">
              {formData.rainSeason || "{Temporada}"}
            </span>{" "}
            {"época de lluvias"}
          </h4>
        </div>
      </div>
      {/* Sección Recomendaciones */}
    </div>
  );
}

export default RecommendationBulletin;
