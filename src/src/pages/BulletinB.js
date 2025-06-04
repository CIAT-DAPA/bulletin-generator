import React, { useState, useEffect } from "react";
import Bulletin from "../components/bulletin/Bulletin";
import { FormDataProvider } from "../context/FormDataContext";
import {
  FaCloudRain,
  FaMoon,
  FaAlignCenter,
  FaClipboardList,
} from "react-icons/fa";
import StepsProgressBarB from "../components/stepsProgressBar/StepsProgressBarB";
import FormComponentB from "../components/formComponent/FormComponentB";
import './DarkMode.css';

function BulletinB() {
  const [currentStep, setCurrentStep] = useState(2);
  const [captureStep, setCaptureStep] = useState(null);
  const [isCurrentStepComplete, setIsCurrentStepComplete] = useState(false);

  const steps = [
    { label: "Detalles generales", icon: <FaAlignCenter /> },
    { label: "Mapa de lluvias", icon: <FaCloudRain /> },
    { label: "Calendario lunar", icon: <FaMoon /> },
    { label: "Recomendaciones", icon: <FaClipboardList /> },
  ];

  useEffect(() => {
    // Aplicar modo oscuro al cargar el componente
    document.documentElement.style.setProperty("--bs-body-bg", "#121212");
    document.documentElement.style.setProperty("--bs-body-color", "#ffffff");
    document.documentElement.style.setProperty("--bs-dark", "#1a1a1a");
    document.documentElement.style.setProperty("--bs-light", "#2d2d2d");

    // Variables adicionales para formularios
    document.documentElement.style.setProperty(
      "--bs-form-control-bg",
      "#2d2d2d"
    );
    document.documentElement.style.setProperty(
      "--bs-form-control-color",
      "#ffffff"
    );
    document.documentElement.style.setProperty("--bs-border-color", "#495057");
    document.documentElement.style.setProperty(
      "--bs-form-control-border-color",
      "#495057"
    );

    // Variables para placeholders
    document.documentElement.style.setProperty(
      "--bs-form-control-placeholder-color",
      "#adb5bd"
    );

    // Variables para select
    document.documentElement.style.setProperty(
      "--bs-form-select-bg",
      "#2d2d2d"
    );
    document.documentElement.style.setProperty(
      "--bs-form-select-color",
      "#ffffff"
    );
    document.documentElement.style.setProperty(
      "--bs-form-select-border-color",
      "#495057"
    );

    // Opcional: aplicar clase de modo oscuro al body
    document.body.classList.add("dark-mode");

    // Cleanup al desmontar el componente
    return () => {
      document.body.classList.remove("dark-mode");
    };
  }, []);

  const handleStepComplete = (complete) => {
    setIsCurrentStepComplete(complete);
  };

  const handleStepChange = (step) => {
    if (step > currentStep && !isCurrentStepComplete) {
      return;
    }
    setCurrentStep(step);
  };
  return (
    <FormDataProvider>
      <div>
        <div className="container mt-4">
          <StepsProgressBarB
            steps={steps}
            currentStep={currentStep}
            onStepChange={handleStepChange}
            isCurrentStepComplete={isCurrentStepComplete}
          />
          <div className="row mt-4">
            <div className="col-md-6">
              <FormComponentB
                currentStep={currentStep}
                onStepChange={handleStepChange}
                totalSteps={steps.length}
                setCaptureStep={setCaptureStep}
                onStepComplete={handleStepComplete}
              />
            </div>
            <div className="col-md-6 d-flex justify-content-center">
              <Bulletin
                currentStep={captureStep ?? currentStep}
                totalSteps={steps.length}
              />
            </div>
          </div>
        </div>
      </div>
    </FormDataProvider>
  );
}

export default BulletinB;
