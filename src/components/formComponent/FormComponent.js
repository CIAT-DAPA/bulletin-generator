import React, { useState, useContext } from "react";
import RainMapForm from "./RainMapForm";
import GeneralForm from "./GeneralForm";
import { FormDataContext } from "../../context/FormDataContext";
import LunarCalendarForm from "./LunarCalendarForm";

function FormComponent({ currentStep, onStepChange, totalSteps }) {
  const { formData, setFormData } = useContext(FormDataContext);
  const [errors, setErrors] = useState({});

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = () => {
    let stepErrors = {};
    // Para el paso 1 (General), se requieren ciertos campos:
    if (currentStep === 1) {
      if (!formData.cityName || formData.cityName.trim() === "")
        stepErrors.cityName = "Este campo es obligatorio.";
      if (!formData.emissionDate)
        stepErrors.emissionDate = "Este campo es obligatorio.";
    }
    // Para el paso 2 (Rain Map), se requieren ciertos campos:
    if (currentStep === 2) {
      if (!formData.rainSeason || formData.rainSeason.trim() === "")
        stepErrors.rainSeason = "Este campo es obligatorio.";
      if (!formData.mapImage)
        stepErrors.mapImage = "Debes subir la imagen del mapa (PNG).";
      if (!formData.startDate)
        stepErrors.startDate = "Este campo es obligatorio.";
      if (!formData.startMoon)
        stepErrors.startMoon = "Selecciona una fase lunar.";
      if (!formData.endDate) stepErrors.endDate = "Este campo es obligatorio.";
      if (!formData.endMoon) stepErrors.endMoon = "Selecciona una fase lunar.";
    }

    setErrors(stepErrors);

    if (currentStep === totalSteps) {
      return alert("Formulario completo");
    }

    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      onStepChange(currentStep + 1);
      setErrors({});
    }
  };

  const handlePrev = () => {
    onStepChange(currentStep - 1);
    setErrors({});
  };

  const renderStepForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <GeneralForm errors={errors} handleFieldChange={handleFieldChange} />
        );
      case 2:
        return (
          <RainMapForm errors={errors} handleFieldChange={handleFieldChange} />
        );
      case 3:
        return (
          <LunarCalendarForm
            errors={errors}
            handleFieldChange={handleFieldChange}
          />
        );
      default:
        return <div>Formulario para el paso {currentStep} no definido.</div>;
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
