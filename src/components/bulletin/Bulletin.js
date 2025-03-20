import React from "react";

function Bulletin({ currentStep }) {
  return (
    <div style={{ width: "380px", height: "725px" }} className="border p-3">
      <h4>Previsualización del Boletín</h4>
      <p>Contenido de la sección {currentStep}</p>
      {/* Aquí se mostrará la previsualización del boletín basada en los datos del formulario */}
    </div>
  );
}

export default Bulletin;
