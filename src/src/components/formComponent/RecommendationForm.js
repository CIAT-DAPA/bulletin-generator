import React, { useState, useContext } from "react";
import { FormDataContext } from "../../context/FormDataContext";

function RecommendationForm({ errors, handleFieldChange }) {
  const { formData, setFormData } = useContext(FormDataContext);

  const [tempRec, setTempRec] = useState("");
  const [recError, setRecError] = useState("");

  const handleAdd = () => {
    if (!tempRec.trim()) {
      setRecError("Debes escribir una recomendación.");
      return;
    }
    // Construimos el nuevo array
    const newRecs = [
      ...formData.recommendations,
      { recommendation: tempRec.trim() },
    ];
    // Actualizamos via handleFieldChange
    handleFieldChange("recommendations", newRecs);
    // Limpiamos
    setTempRec("");
    setRecError("");
  };

  const handleRemove = (idx) => {
    const newRecs = formData.recommendations.filter((_, i) => i !== idx);
    handleFieldChange("recommendations", newRecs);
  };

  return (
    <form>
      <fieldset>
        <legend>Recomendaciones</legend>

        {/* Input + botón Agregar */}
        <div className="row g-2 align-items-end">
          <div className="col-8">
            <label htmlFor="recommendation" className="form-label">
              Recomendación
            </label>
            <input
              type="text"
              className="form-control"
              id="recommendation"
              value={tempRec}
              onChange={(e) => {
                setTempRec(e.target.value);
                if (recError) setRecError("");
              }}
              placeholder="ej. Riega el 15 de marzo los cultivos de maíz"
            />
            {(recError || errors.recommendations) && (
              <div className="text-danger">
                {recError || errors.recommendations}
              </div>
            )}
          </div>
          <div className="col-4 d-grid">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAdd}
            >
              Agregar
            </button>
          </div>
        </div>

        {/* Lista de recomendaciones */}
        <div className="mt-3">
          {formData.recommendations.length === 0 ? (
            <p className="text-muted">No hay recomendaciones</p>
          ) : (
            <ul
              className="list-group overflow-auto"
              style={{ maxHeight: "280px" }}
            >
              {formData.recommendations.map((rec, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    <strong>Recomendación:</strong> {rec.recommendation}
                  </span>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger text-white"
                    onClick={() => handleRemove(index)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </fieldset>
    </form>
  );
}

export default RecommendationForm;
