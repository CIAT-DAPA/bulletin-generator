import React, { useContext } from "react";
import { FormDataContext } from "../../context/FormDataContext";
import lunaNueva from "../../assets/lunaNueva.png";
import cuartoCreciente from "../../assets/cuartoCreciente.png";
import lunaLlena from "../../assets/lunaLlena.png";
import cuartoMenguante from "../../assets/cuartoMenguante.png";
import lluviaIco from "../../assets/lluviaIco.png";
import lluviaBorderIco from "../../assets/lluviaBorderIco.png";
import calendarIco from "../../assets/calendarIco.png";

function RainMapBulletin() {
  const { formData } = useContext(FormDataContext);

  const moonPhaseImages = {
    "Luna Nueva": lunaNueva,
    "Cuarto Creciente": cuartoCreciente,
    "Luna Llena": lunaLlena,
    "Cuarto Menguante": cuartoMenguante,
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("es-ES", { day: "numeric", month: "long" });
  };

  return (
    <div className="d-flex flex-column justify-content-start h-100 p-2 gap-3">
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
            <bold className="fw-bold text-uppercase">
              {formData.rainSeason || "{Época}"}
            </bold>{" "}
            {"época de lluvias"}
          </h4>
        </div>
      </div>

      {/* Sección Media (Mapa) */}
      <div className="text-center">
        <div className="d-flex justify-content-center align-items-center bg-dark-transparent text-white rounded-1 gap-2 py-1">
          <img src={lluviaBorderIco} alt="Lluvia" style={{ height: "24px" }} />
          <span className="fw-normal">Puede empezar a llover en</span>
        </div>
        <div className="bg-dark-transparent-content rounded-1">
          {formData.mapImage ? (
            <img
              src={URL.createObjectURL(formData.mapImage)}
              alt="Mapa de lluvias"
              className="img-fluid border"
              style={{
                height: "230px",
                objectFit: "contain",
              }}
            />
          ) : (
            <div className="border p-2">
              <small>Por favor sube un mapa</small>
            </div>
          )}
        </div>
      </div>

      {/* Sección Inferior (Fechas y Fases Lunares) */}
      <div className="text-center">
        <div className="d-flex justify-content-center align-items-center bg-dark-transparent text-white rounded-1 gap-2 py-1">
          <img src={calendarIco} alt="Lluvia" style={{ height: "24px" }} />
          <span className="fw-normal">Entre estas fechas</span>
        </div>
        <div className="d-flex justify-content-around align-items-center bg-dark-transparent-content rounded-1">
          {/* Columna Inicio */}
          <div>
            <p className="fw-bold mb-1">
              {formatDate(formData.startDate) || "{fecha inicio}"}
            </p>
            {formData.startMoon && moonPhaseImages[formData.startMoon] ? (
              <img
                src={moonPhaseImages[formData.startMoon]}
                alt={formData.startMoon}
                style={{ height: "40px" }}
              />
            ) : (
              <div className="border p-2">
                <small>Por favor escoge una fase lunar</small>
              </div>
            )}
            <p className="mb-0">
              {formData.startMoon || "{fase lunar de inicio}"}
            </p>
          </div>

          {/* Separador "y" */}
          <div className="fw-bold text-white bg-dark-transparent rounded-1 px-2 py-1">
            Y
          </div>

          {/* Columna Fin */}
          <div>
            <p className="fw-bold mb-1">
              {formatDate(formData.endDate) || "{fecha fin}"}
            </p>
            {formData.endMoon && moonPhaseImages[formData.endMoon] ? (
              <img
                src={moonPhaseImages[formData.endMoon]}
                alt={formData.endMoon}
                style={{ height: "40px" }}
              />
            ) : (
              <div className="border p-2">
                <small>Por favor escoge una fase lunar</small>
              </div>
            )}
            <p className="mb-0">{formData.endMoon || "{fase lunar de fin}"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RainMapBulletin;
