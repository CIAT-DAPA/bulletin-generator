import React, { useState } from "react";
import StepsProgressBar from "./components/stepsProgressBar/StepsProgressBar";
import FormComponent from "./components/formComponent/FormComponent";
import Bulletin from "./components/bulletin/Bulletin";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { FormDataProvider } from "./context/FormDataContext";
import {
  FaCloudRain,
  FaMoon,
  FaAlignCenter,
  FaClipboardList,
} from "react-icons/fa";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [captureStep, setCaptureStep] = useState(null);
  const [isCurrentStepComplete, setIsCurrentStepComplete] = useState(false);

  const steps = [
    { label: "Detalles generales", icon: <FaAlignCenter /> },
    { label: "Mapa de lluvias", icon: <FaCloudRain /> },
    { label: "Calendario lunar", icon: <FaMoon /> },
    { label: "Recomendaciones", icon: <FaClipboardList /> },
  ];

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
        <Navbar appName="Generador de Boletines" />
        <div className="container mt-4">
          <StepsProgressBar
            steps={steps}
            currentStep={currentStep}
            onStepChange={handleStepChange}
            isCurrentStepComplete={isCurrentStepComplete}
          />
          <div className="row mt-4">
            <div className="col-md-6">
              <FormComponent
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
        <Footer />
      </div>
    </FormDataProvider>
  );
}

export default App;
