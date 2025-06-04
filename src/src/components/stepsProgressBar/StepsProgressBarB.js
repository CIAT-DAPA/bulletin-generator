import React from "react";
import { FaCheck } from "react-icons/fa";
import "./StepsProgressBar.css";

function StepsProgressBarB({
  steps,
  currentStep,
  onStepChange,
  isCurrentStepComplete,
}) {
  return (
    <div className="steps-container">
      <div className="steps-wrapper">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const stepCompleted = currentStep > stepNumber;
          const stepActive = currentStep === stepNumber;

          return (
            <div
              className="step-item"
              key={index}
              onClick={() => {
                if (stepNumber <= currentStep) {
                  onStepChange(stepNumber);
                } else if (isCurrentStepComplete) {
                  onStepChange(stepNumber);
                }
              }}
              style={{ cursor: "pointer" }}
            >
              {index < steps.length - 1 && <div className="step-line-b" />}
              <div
                className={
                  "step-circle-b " +
                  (stepCompleted
                    ? "completed"
                    : stepActive
                    ? "active"
                    : "inactive")
                }
              >
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StepsProgressBarB;
