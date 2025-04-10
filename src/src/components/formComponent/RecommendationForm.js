import React, { useState, useContext } from "react";
import { FormDataContext } from "../../context/FormDataContext";

function RecommendationForm({ errors, handleFieldChange }) {
  const { formData } = useContext(FormDataContext);

  const [tempRec, setTempRec] = useState("");
  const [recError, setRecError] = useState("");

  const handleAdd = () => {
    if (!tempRec.trim()) {
      setRecError("Debes escribir una recomendación.");
      return;
    }
    const newRecs = [
      ...formData.recommendations,
      { recommendation: tempRec.trim() },
    ];
    handleFieldChange("recommendations", newRecs);
    setTempRec("");
    setRecError("");
  };

  const handleRemove = (idx) => {
    const newRecs = formData.recommendations.filter((_, i) => i !== idx);
    handleFieldChange("recommendations", newRecs);
  };

  return (
    <>
      <fieldset>
        <legend>Recomendaciones</legend>
        <div className="mb-3">
          <label htmlFor="recommendation" className="form-label">
            Recomendación
          </label>
          <textarea
            className="form-control"
            id="recommendation"
            rows={5}
            value={tempRec}
            onChange={(e) => {
              setTempRec(e.target.value);
              if (recError) setRecError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                // Ctrl+Enter o Cmd+Enter añade, para no impedir saltos de línea
                e.preventDefault();
                handleAdd();
              }
            }}
            placeholder="Escribe aquí tu recomendación detallada..."
          />
          {(recError || errors.recommendations) && (
            <div className="text-danger mt-1">
              {recError || errors.recommendations}
            </div>
          )}
        </div>
        <div className="text-end mb-3">
          <button type="button" className="btn btn-primary" onClick={handleAdd}>
            Agregar
          </button>
        </div>
      </fieldset>

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
                className="list-group-item d-flex justify-content-between align-items-start"
              >
                <div>{rec.recommendation}</div>
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
    </>
  );
}

export default RecommendationForm;
