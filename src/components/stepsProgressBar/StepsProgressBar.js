import React from "react";
import { FaCheck } from "react-icons/fa";
import "./StepsProgressBar.css";

function StepsProgressBar({ steps, currentStep, onStepChange }) {
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
              onClick={() => onStepChange(stepNumber)}
              style={{ cursor: "pointer" }}
            >
              {index < steps.length - 1 && <div className="step-line" />}
              <div
                className={
                  "step-circle " +
                  (stepCompleted
                    ? "completed"
                    : stepActive
                    ? "active"
                    : "inactive")
                }
              >
                {stepCompleted ? <FaCheck /> : step.icon}
              </div>
              <div className="step-label">{step.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StepsProgressBar;
