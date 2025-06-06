import React, { useState, useContext, useEffect } from "react";
import RainMapForm from "./RainMapForm";
import GeneralForm from "./GeneralForm";
import LunarCalendarForm from "./LunarCalendarForm";
import { FormDataContext } from "../../context/FormDataContext";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import RecommendationForm from "./RecommendationForm";
import RainMapBulletin from "../bulletin/RainMapBulletin";
import LunarCalendarBulletin from "../bulletin/LunarCalendarBulletin";
import RecommendationBulletin from "../bulletin/RecommendationBulletin";
import Bulletin from "../bulletin/Bulletin";
import { FaArrowLeft, FaCheck } from "react-icons/fa";

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
  const [showPreview, setShowPreview] = useState(false);
  const [previewStep, setPreviewStep] = useState(2);

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
    if (currentStep === 4) {
      if (!formData.recommendations.length)
        stepErrors.recommendations = "Debes agregar recomendaciones.";
    }

    setErrors(stepErrors);
    onStepComplete(Object.keys(stepErrors).length === 0);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = async () => {
    if (currentStep === totalSteps) {
      if (!validateStep()) return;
      // Mostrar previsualización en lugar de generar inmediatamente
      setShowPreview(true);
      setPreviewStep(2); // Comenzar con el primer paso del boletín
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

  const handleExport = async () => {
    setLoading(true);
    setShowPreview(false);
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
        zip.file(`Boletin_${step - 1}.png`, imgData, { base64: true });
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

  const handleClosePreview = () => {
    setShowPreview(false);
    setCaptureStep(null);
  };

  const handlePreviewStepChange = (step) => {
    setPreviewStep(step);
    setCaptureStep(step);
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
      case 4:
        return (
          <RecommendationForm
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

  useEffect(() => {
    if (showPreview) {
      setCaptureStep(previewStep);
    }
  }, [showPreview, previewStep]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
      >
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
          <button type="submit" className="btn btn-primary">
            {currentStep < totalSteps ? "Siguiente" : "Previsualizar"}
          </button>
        </div>
      </form>

      {/* Modal de Previsualización */}
      {showPreview && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ minWidth: "630px" }}>
              <div className="modal-header py-2">
                <h5 className="modal-title">Previsualización del Boletín</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClosePreview}
                ></button>
              </div>
              <div className="modal-body p-0">
                <div className="d-flex">
                  <div className="p-3 bg-light border-end">
                    <h6>Navegación de páginas:</h6>
                    <div className="d-grid gap-2 mb-3">
                      {Array.from(
                        { length: totalSteps - 1 },
                        (_, i) => i + 2
                      ).map((step) => (
                        <button
                          key={step}
                          type="button"
                          className={`btn btn-sm ${
                            previewStep === step
                              ? "btn-primary"
                              : "btn-outline-primary"
                          }`}
                          onClick={() => handlePreviewStepChange(step)}
                        >
                          Página {step - 1}:{" "}
                          {step === 2
                            ? "Mapa de lluvias"
                            : step === 3
                            ? "Calendario lunar"
                            : step === 4
                            ? "Recomendaciones"
                            : `Paso ${step}`}
                        </button>
                      ))}
                    </div>
                    <div>
                      <h6 className="small">Datos del boletín:</h6>
                      <ul className="list-unstyled small">
                        <li>
                          <strong>Ciudad:</strong> {formData.cityName}
                        </li>
                        <li>
                          <strong>Fecha emisión:</strong>{" "}
                          {formData.emissionDate}
                        </li>
                        <li>
                          <strong>Temporada:</strong> {formData.rainSeason}
                        </li>
                        <li>
                          <strong>Mes calendario:</strong>{" "}
                          {formData.calendarMonth}
                        </li>
                        <li>
                          <strong>Recomendaciones:</strong>{" "}
                          {formData.recommendations?.length || 0}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="px-4 py-2 d-flex align-items-center justify-content-center">
                    <div>
                      <Bulletin currentStep={previewStep} totalSteps={4} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer py-1">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClosePreview}
                >
                  <FaArrowLeft className="me-1"/> Volver a editar
                </button>
                <button
                  type="button"
                  className="btn btn-success text-white"
                  onClick={handleExport}
                >
                  <FaCheck className="me-1"/> Exportar boletín
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Carga */}
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
    </>
  );
}

export default FormComponent;
