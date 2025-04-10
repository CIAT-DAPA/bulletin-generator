import React, { useContext } from "react";
import { FormDataContext } from "../../context/FormDataContext";

function RainMapForm({ errors, handleFieldChange }) {
  const { formData } = useContext(FormDataContext);

  const moonPhases = [
    "Luna Nueva",
    "Cuarto Creciente",
    "Luna Llena",
    "Cuarto Menguante",
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      handleFieldChange("mapImage", file);
    } else {
      alert("Please upload a PNG image.");
    }
  };

  return (
    <>
      {/* Group 1: Title */}
      <fieldset className="mb-4">
        <legend>Titulo</legend>
        <div className="mb-3">
          <label htmlFor="rainSeason" className="form-label">
            Temporada de lluvia
          </label>
          <input
            type="text"
            className="form-control"
            id="rainSeason"
            value={formData.rainSeason}
            onChange={(e) => handleFieldChange("rainSeason", e.target.value)}
            placeholder="ej. primera, segunda..."
          />
          {errors.rainSeason && (
            <div className="text-danger">{errors.rainSeason}</div>
          )}
        </div>
      </fieldset>

      {/* Group 2: Map */}
      <fieldset className="mb-4">
        <legend>Mapa</legend>
        <div className="mb-3">
          <label htmlFor="mapImage" className="form-label">
            Sube la imagen del mapa (PNG)
          </label>
          <input
            type="file"
            accept="image/png"
            className="form-control"
            id="mapImage"
            onChange={handleImageUpload}
          />
          {errors.mapImage && (
            <div className="text-danger">{errors.mapImage}</div>
          )}
        </div>
      </fieldset>

      {/* Group 3: Dates */}
      <fieldset className="mb-4">
        <legend>Fechas</legend>
        <div className="row">
          <div className="col-md-6">
            <div className="border p-3 rounded-3 mb-3">
              <h6 className="fw-bold mb-3 border-bottom pb-2">Inicio</h6>
              <div className="mb-3">
                <label htmlFor="startDate" className="form-label">
                  Fecha de inicio
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  value={formData.startDate}
                  onChange={(e) =>
                    handleFieldChange("startDate", e.target.value)
                  }
                  max={formData.endDate ? formData.endDate : ""}
                />
                {errors.startDate && (
                  <div className="text-danger">{errors.startDate}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="startMoon" className="form-label">
                  Fase de la luna en la fecha de inicio
                </label>
                <select
                  className="form-select"
                  id="startMoon"
                  value={formData.startMoon}
                  onChange={(e) =>
                    handleFieldChange("startMoon", e.target.value)
                  }
                >
                  <option value="">Selecciona una fase lunar</option>
                  {moonPhases.map((phase, idx) => (
                    <option key={idx} value={phase}>
                      {phase}
                    </option>
                  ))}
                </select>
                {errors.startMoon && (
                  <div className="text-danger">{errors.startMoon}</div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="border p-3 rounded-3 mb-3">
              <h6 className="fw-bold mb-3 border-bottom pb-2">Fin</h6>
              <div className="mb-3">
                <label htmlFor="endDate" className="form-label">
                  Fecha de fin
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  value={formData.endDate}
                  onChange={(e) => handleFieldChange("endDate", e.target.value)}
                  min={formData.startDate ? formData.startDate : ""}
                />
                {errors.endDate && (
                  <div className="text-danger">{errors.endDate}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="endMoon" className="form-label">
                  Fase de la luna en la fecha de fin
                </label>
                <select
                  className="form-select"
                  id="endMoon"
                  value={formData.endMoon}
                  onChange={(e) => handleFieldChange("endMoon", e.target.value)}
                >
                  <option value="">Selecciona una fase lunar</option>
                  {moonPhases.map((phase, idx) => (
                    <option key={idx} value={phase}>
                      {phase}
                    </option>
                  ))}
                </select>
                {errors.endMoon && (
                  <div className="text-danger">{errors.endMoon}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </fieldset>
    </>
  );
}

export default RainMapForm;
