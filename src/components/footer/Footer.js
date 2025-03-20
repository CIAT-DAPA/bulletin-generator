import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">
        <h5>Socios del Proyecto</h5>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          {/* Ejemplo de logos. Reemplaza 'logo1.png', etc., por la ruta real de tus imágenes */}
          <img
            src="logo1.png"
            alt="Logo Socio 1"
            className="m-2"
            style={{ maxWidth: "100px" }}
          />
          <img
            src="logo2.png"
            alt="Logo Socio 2"
            className="m-2"
            style={{ maxWidth: "100px" }}
          />
          <img
            src="logo3.png"
            alt="Logo Socio 3"
            className="m-2"
            style={{ maxWidth: "100px" }}
          />
          {/* Agrega más logos según sea necesario */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
