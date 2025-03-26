import React, { useState, useContext, useEffect } from "react";
import RainMapForm from "./RainMapForm";
import GeneralForm from "./GeneralForm";
import LunarCalendarForm from "./LunarCalendarForm";
import { FormDataContext } from "../../context/FormDataContext";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import { saveAs } from "file-saver";

function FormComponent({
  currentStep,
  onStepChange,
  totalSteps,
  setCaptureStep,
  onStepComplete,
}) {
  const { formData, setFormData } = useContext(FormDataContext);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
    if (currentStep === 1) {
      if (!formData.cityName || formData.cityName.trim() === "")
        stepErrors.cityName = "Este campo es obligatorio.";
      if (!formData.emissionDate)
        stepErrors.emissionDate = "Este campo es obligatorio.";
    }
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
    if (currentStep === 3) {
      if (!formData.calendarMonth)
        stepErrors.calendarMonth = "Este campo es obligatorio.";
    }

    setErrors(stepErrors);
    onStepComplete(Object.keys(stepErrors).length === 0);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = async () => {
    if (currentStep === totalSteps) {
      if (!validateStep()) return;
      await handleFinish();
      return;
    }
    if (validateStep()) {
      onStepChange(currentStep + 1);
      setErrors({});
    }
  };

  const handlePrev = () => {
    onStepChange(currentStep - 1);
    setErrors({});
  };

  const changeBulletinStep = (step) => {
    return new Promise((resolve) => {
      setCaptureStep(step);
      resolve();
    });
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      const zip = new JSZip();
      for (let step = 2; step <= totalSteps; step++) {
        await changeBulletinStep(step);
        await new Promise((r) => setTimeout(r, 300));
        const bulletinElement = document.getElementById("bulletinCapture");
        if (!bulletinElement) continue;
        const canvas = await html2canvas(bulletinElement);
        const dataURL = canvas.toDataURL("image/png");
        const imgData = dataURL.split("base64,")[1];
        zip.file(`Boletin_Paso_${step - 1}.png`, imgData, { base64: true });
      }
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "boletines.zip");
      setCaptureStep(null);
    } catch (err) {
      console.error("Error generando ZIP:", err);
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
    validateStep();
  }, [formData, currentStep]);

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
      {loading && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center d-flex align-items-center justify-content-center gap-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3">Generando boletín...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormComponent;
