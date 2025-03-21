import React from "react";
import RainMapForm from "./RainMapForm";
import GeneralForm from "./GeneralForm";

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

  const renderStepForm = () => {
    switch (currentStep) {
      case 1:
        return <GeneralForm />;
      case 2:
        return <RainMapForm />;
      // case 2: return <LunarCalendarForm />;
      default:
        return <div>Form for step {currentStep} not defined yet.</div>;
    }
  };

  return (
    <div>
      <h3>Formulario - Paso {currentStep}</h3>
      {renderStepForm()}
      <div className="d-flex justify-content-between mt-3">
        {currentStep > 1 && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handlePrev}
          >
            Anterior
          </button>
        )}

        <button type="button" className="btn btn-primary" onClick={handleNext}>
          {currentStep < totalSteps ? "Siguiente" : "Finalizar"}
        </button>
      </div>
    </div>
  );
}

export default FormComponent;
