import React, { useState } from "react";
import StepsProgressBar from "./components/stepsProgressBar/StepsProgressBar";
import FormComponent from "./components/formComponent/FormComponent";
import Bulletin from "./components/bulletin/Bulletin";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { FormDataProvider } from "./context/FormDataContext";
import { FaCloudRain, FaMoon } from "react-icons/fa";

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { label: "Mapa de lluvias", icon: <FaCloudRain /> },
    { label: "Calendario lunar", icon: <FaMoon /> },
  ];

  const handleStepChange = (step) => {
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
          />
          <div className="row mt-4">
            <div className="col-md-6">
              <FormComponent
                currentStep={currentStep}
                onStepChange={handleStepChange}
                totalSteps={steps.length}
              />
            </div>
            <div className="col-md-6 d-flex justify-content-center">
              <Bulletin currentStep={currentStep} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </FormDataProvider>
  );
}

export default App;
