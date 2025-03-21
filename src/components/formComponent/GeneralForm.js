import React, { useContext } from "react";
import { FormDataContext } from "../../context/FormDataContext";

function GeneralForm() {
  const { formData, setFormData } = useContext(FormDataContext);

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
            onChange={(e) =>
              setFormData({ ...formData, cityName: e.target.value })
            }
            placeholder="ej. Santa Rosa... "
          />
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
            onChange={(e) =>
              setFormData({ ...formData, emissionDate: e.target.value })
            }
          />
        </div>
      </fieldset>
    </form>
  );
}

export default GeneralForm;
