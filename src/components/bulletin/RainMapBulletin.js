import React, { useContext } from "react";
import { FormDataContext } from "../../context/FormDataContext";
import lunaNueva from "../../assets/lunaNueva.png";
import cuartoCreciente from "../../assets/cuartoCreciente.png";
import lunaLlena from "../../assets/lunaLlena.png";
import cuartoMenguante from "../../assets/cuartoMenguante.png";

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
    <div className="p-2">
      {/* Sección Superior */}
      <div className="text-center mb-3">
        <h6 className="fw-bold m-0">El Boletín Comunitario</h6>
        <h5 className="m-0">
          {formData.rainSeason || "Época de lluvias"}{" "}
          {formData.seasonYear || ""}
        </h5>
        <small className="text-muted">Fuente de datos: ICC</small>
      </div>

      {/* Sección Media (Mapa) */}
      <div className="text-center mb-3">
        <h6 className="fw-bold">Puede empezar a llover en</h6>
        {formData.mapImage ? (
          <img
            src={URL.createObjectURL(formData.mapImage)}
            alt="Mapa de lluvias"
            className="img-fluid border"
            style={{ maxHeight: "200px", objectFit: "contain" }}
          />
        ) : (
          <div className="border p-2">
            <small>Sin mapa cargado</small>
          </div>
        )}
      </div>

      {/* Sección Inferior (Fechas y Fases Lunares) */}
      <div className="text-center">
        <h6 className="fw-bold mb-3">Entre estas fechas</h6>

        <div className="d-flex justify-content-around align-items-center">
          {/* Columna Inicio */}
          <div>
            <p className="fw-bold mb-1">
              {formatDate(formData.startDate) || "-"}
            </p>
            {/* Imagen de la fase lunar inicial, si existe */}
            {formData.startMoon && moonPhaseImages[formData.startMoon] && (
              <img
                src={moonPhaseImages[formData.startMoon]}
                alt={formData.startMoon}
                style={{ height: "40px" }}
              />
            )}
            <p className="mb-0">{formData.startMoon || ""}</p>
          </div>

          {/* Separador "y" */}
          <div className="fw-bold">y</div>

          {/* Columna Fin */}
          <div>
            <p className="fw-bold mb-1">
              {formatDate(formData.endDate) || "-"}
            </p>
            {/* Imagen de la fase lunar final, si existe */}
            {formData.endMoon && moonPhaseImages[formData.endMoon] && (
              <img
                src={moonPhaseImages[formData.endMoon]}
                alt={formData.endMoon}
                style={{ height: "40px" }}
              />
            )}
            <p className="mb-0">{formData.endMoon || ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RainMapBulletin;
