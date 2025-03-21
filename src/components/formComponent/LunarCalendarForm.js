import React, { useContext } from "react";
import { FormDataContext } from "../../context/FormDataContext";

function LunarCalendarForm({ errors, handleFieldChange }) {
  const { formData } = useContext(FormDataContext);

  return (
    <form>
      <fieldset>
        <legend>Calendario Lunar</legend>
        <div className="mb-3">
          <label htmlFor="calendarMonth" className="form-label">
            Selecciona Mes y Año
          </label>
          <input
            type="month"
            className="form-control"
            id="calendarMonth"
            value={formData.calendarMonth || ""}
            onChange={(e) => handleFieldChange("calendarMonth", e.target.value)}
          />
          {errors?.calendarMonth && (
            <div className="text-danger">{errors.calendarMonth}</div>
          )}
        </div>
      </fieldset>
    </form>
  );
}

export default LunarCalendarForm;
