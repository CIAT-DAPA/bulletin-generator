import React, { useContext } from "react";
import { FormDataContext } from "../../context/FormDataContext";

function RainMapForm() {
  const { formData, setFormData } = useContext(FormDataContext);

  const moonPhases = [
    "Luna Nueva",
    "Cuarto Creciente",
    "Luna Llena",
    "Cuarto Menguante",
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      setFormData({ ...formData, mapImage: file });
    } else {
      alert("Please upload a PNG image.");
    }
  };

  return (
    <form>
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
            onChange={(e) =>
              setFormData({ ...formData, rainSeason: e.target.value })
            }
            placeholder="ej. primera, segunda..."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="seasonYear" className="form-label">
            Año de la temporada
          </label>
          <input
            type="number"
            className="form-control"
            id="seasonYear"
            value={formData.seasonYear}
            onChange={(e) =>
              setFormData({ ...formData, seasonYear: e.target.value })
            }
            placeholder="ej. 2025"
          />
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
        </div>
      </fieldset>

      {/* Group 3: Dates */}
      <fieldset className="mb-4">
        <legend>Fechas</legend>
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
              setFormData({ ...formData, startDate: e.target.value })
            }
          />
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
              setFormData({ ...formData, startMoon: e.target.value })
            }
          >
            <option value="">Selecciona una fase lunar</option>
            {moonPhases.map((phase, idx) => (
              <option key={idx} value={phase}>
                {phase}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">
            Fecha de fin
          </label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endMoon" className="form-label">
            Fase de la luna en la fecha de fin
          </label>
          <select
            className="form-select"
            id="endMoon"
            value={formData.endMoon}
            onChange={(e) =>
              setFormData({ ...formData, endMoon: e.target.value })
            }
          >
            <option value="">Selecciona una fase lunar</option>
            {moonPhases.map((phase, idx) => (
              <option key={idx} value={phase}>
                {phase}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
    </form>
  );
}

export default RainMapForm;
