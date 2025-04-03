import React, { createContext, useState } from "react";

export const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Datos para el step 1 (General)
    emissionDate: "",
    cityName: "",
    // Datos para el step 2 (Rain Map)
    rainSeason: "",
    mapImage: null,
    startDate: "",
    startMoon: "",
    endDate: "",
    endMoon: "",
    // Datos para el step 3 (Lunar Calendar)
    calendarMonth: "",
    events: [],
    loadingMoons: false,
  });

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
