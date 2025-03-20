import React, { createContext, useState } from "react";

export const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Datos para el step 1 (Rain Map)
    rainSeason: "",
    seasonYear: "",
    mapImage: null,
    startDate: "",
    startMoon: "",
    endDate: "",
    endMoon: "",
    // Aquí puedes agregar campos para otros pasos en el futuro
  });

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
