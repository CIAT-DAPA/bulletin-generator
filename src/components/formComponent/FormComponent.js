import React from "react";

function FormComponent({ currentStep, onStepChange, totalSteps }) {
  const handleNext = () => {
    // Si no es el último paso, avanza al siguiente
    if (currentStep < totalSteps) {
      onStepChange(currentStep + 1);
    } else {
      // Aquí va la lógica de "Finalizar"
      alert("Formulario completado");
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      onStepChange(currentStep - 1);
    }
  };

  return (
    <div>
      <h3>Formulario - Sección {currentStep}</h3>
      <form>
        {/* Tus campos, selects, etc. */}
        <div className="mb-3">
          <label htmlFor={`input${currentStep}`} className="form-label">
            Campo de Texto
          </label>
          <input
            type="text"
            className="form-control"
            id={`input${currentStep}`}
            placeholder="Escribe aquí..."
          />
        </div>

        <div className="d-flex justify-content-between">
          {currentStep > 1 && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handlePrev}
            >
              Anterior
            </button>
          )}

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleNext}
          >
            {currentStep < totalSteps ? "Siguiente" : "Finalizar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormComponent;
