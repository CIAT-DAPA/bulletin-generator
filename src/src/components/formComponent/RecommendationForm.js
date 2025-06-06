import React, { useState, useContext } from "react";
import { FormDataContext } from "../../context/FormDataContext";
import { FaCheck, FaPen, FaTrash } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

function RecommendationForm({ errors, handleFieldChange }) {
  const { formData } = useContext(FormDataContext);

  const [tempRec, setTempRec] = useState("");
  const [recError, setRecError] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleAdd = () => {
    if (!tempRec.trim()) {
      setRecError("Debes escribir una recomendación.");
      return;
    }
    const recommendations = tempRec
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => ({ recommendation: line }));

    if (recommendations.length === 0) {
      setRecError("Debes escribir al menos una recomendación.");
      return;
    }
    const newRecs = [...formData.recommendations, ...recommendations];
    handleFieldChange("recommendations", newRecs);
    setTempRec("");
    setRecError("");
  };

  const handleRemove = (idx) => {
    const newRecs = formData.recommendations.filter((_, i) => i !== idx);
    handleFieldChange("recommendations", newRecs);
    if (editingIndex === idx) {
      setEditingIndex(null);
      setEditingText("");
    }
  };

  const handleStartEdit = (index, currentText) => {
    setEditingIndex(index);
    setEditingText(currentText);
  };

  const handleSaveEdit = () => {
    if (!editingText.trim()) {
      return; // No guardar si está vacío
    }

    const newRecs = [...formData.recommendations];
    newRecs[editingIndex] = { recommendation: editingText.trim() };
    handleFieldChange("recommendations", newRecs);

    // Limpiar estado de edición
    setEditingIndex(null);
    setEditingText("");
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingText("");
  };

  const handleInputBlur = (e) => {
    // Solo guardar si no se está haciendo clic en los botones de acción
    setTimeout(() => {
      if (editingIndex !== null) {
        handleSaveEdit();
      }
    }, 100);
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
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
          <div className="form-text">
            💡 Tip: Cada línea será una recomendación separada. Usa Ctrl+Enter
            para agregar todas o presiona el botón.
          </div>
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
                <div className="flex-grow-1 me-2">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={handleEditKeyDown}
                      onBlur={handleInputBlur}
                      autoFocus
                    />
                  ) : (
                    <span>{rec.recommendation}</span>
                  )}
                </div>
                <div className="d-flex gap-1">
                  {editingIndex === index ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-sm btn-success text-white"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={handleSaveEdit}
                        title="Guardar cambios"
                      >
                        <FaCheck/>
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-secondary"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={handleCancelEdit}
                        title="Cancelar edición"
                      >
                        <MdCancel/>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-sm btn-warning"
                      onClick={() => handleStartEdit(index, rec.recommendation)}
                      title="Editar recomendación"
                    >
                      <FaPen/>
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-sm btn-danger text-white"
                    onClick={() => handleRemove(index)}
                    title="Eliminar recomendación"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default RecommendationForm;
