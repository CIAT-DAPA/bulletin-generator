import React, { useContext } from "react";
import { FormDataContext } from "../../context/FormDataContext";
import lluviaIco from "../../assets/lluviaIco.png";
import recommendationIco from "../../assets/recommendationIco.png";
import familyImg from "../../assets/family.png";

function RecommendationBulletin() {
  const { formData } = useContext(FormDataContext);
  return (
    <div className="d-flex flex-column justify-content-start h-100 p-2 gap-2">
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
      <div className="text-center">
        <div className="d-flex justify-content-center align-items-center bg-dark-transparent text-white rounded-1 gap-2 py-1">
          <img
            src={recommendationIco}
            alt="Lluvia"
            style={{ height: "24px" }}
          />
          <span className="fw-normal">Recomendaciones</span>
        </div>
        <img src={familyImg} alt="Familia" className="img-fluid" />
        <div className="d-flex justify-content-around align-items-center bg-dark-transparent-content rounded-1">
          <ul>
            {formData.recommendations.length === 0 ? (
              <p className="text-muted">No hay recomendaciones</p>
            ) : (
              formData.recommendations.map((rec, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    <strong>Recomendación:</strong> {rec.recommendation}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RecommendationBulletin;
