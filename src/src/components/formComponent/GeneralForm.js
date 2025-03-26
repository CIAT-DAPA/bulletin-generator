import React, { useContext } from "react";
import { FormDataContext } from "../../context/FormDataContext";

function GeneralForm({ errors, handleFieldChange }) {
  const { formData } = useContext(FormDataContext);

  return (
    <form>
      <fieldset className="mb-4">
        <legend>Detalles generales</legend>
        <div className="mb-3">
          <label htmlFor="cityName" className="form-label">
            Municipio
          </label>
          <input
            type="text"
            className="form-control"
            id="cityName"
            value={formData.cityName}
            onChange={(e) => handleFieldChange("cityName", e.target.value)}
            placeholder="ej. Santa Rosa... "
          />
          {errors.cityName && (
            <div className="text-danger">{errors.cityName}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="emissionDate" className="form-label">
            Fecha de emisión del boletin
          </label>
          <input
            type="date"
            className="form-control"
            id="emissionDate"
            value={formData.emissionDate}
            onChange={(e) => handleFieldChange("emissionDate", e.target.value)}
          />
          {errors.emissionDate && (
            <div className="text-danger">{errors.emissionDate}</div>
          )}
        </div>
      </fieldset>
    </form>
  );
}

export default GeneralForm;
