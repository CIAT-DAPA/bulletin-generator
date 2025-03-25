import React, { useState, useContext } from "react";
import { FormDataContext } from "../../context/FormDataContext";

function LunarCalendarForm({ errors, handleFieldChange }) {
  const { formData, setFormData } = useContext(FormDataContext);

  const [tempDay, setTempDay] = useState("");
  const [tempMoon, setTempMoon] = useState("");

  const [dayError, setDayError] = useState("");
  const [moonError, setMoonError] = useState("");

  const moonPhases = [
    "Luna Nueva",
    "Cuarto Creciente",
    "Luna Llena",
    "Cuarto Menguante",
  ];

  const handleDayChange = (e) => {
    setTempDay(e.target.value);
    if (dayError) {
      setDayError("");
    }
  };

  const handleMoonChange = (e) => {
    setTempMoon(e.target.value);
    if (moonError) {
      setMoonError("");
    }
  };

  const handleAddEvent = () => {
    let hasError = false;

    if (!tempDay) {
      setDayError("Debes indicar el día.");
      hasError = true;
    }
    if (!tempMoon) {
      setMoonError("Selecciona una fase lunar.");
      hasError = true;
    }

    const duplicateEvent = formData.events.find(
      (ev) => parseInt(ev.day, 10) === parseInt(tempDay, 10)
    );
    if (duplicateEvent) {
      setDayError("Ya existe un evento para este día.");
      hasError = true;
    }

    if (hasError) return;

    const newEvent = {
      day: tempDay,
      moon: tempMoon,
    };
    setFormData({
      ...formData,
      events: [...formData.events, newEvent],
    });
    setTempDay("");
    setTempMoon("");
  };

  const handleRemoveEvent = (index) => {
    const newEvents = [...formData.events];
    newEvents.splice(index, 1);
    setFormData({
      ...formData,
      events: newEvents,
    });
  };

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

      <fieldset>
        <legend>Eventos</legend>
        <div className="row g-2 align-items-end">
          <div className="col-4 align-self-start">
            <label htmlFor="eventDay" className="form-label">
              Día
            </label>
            <input
              type="number"
              className="form-control"
              id="eventDay"
              value={tempDay}
              onChange={handleDayChange}
              placeholder="ej. 15"
            />
            {dayError && <div className="text-danger">{dayError}</div>}
          </div>

          <div className="col-5 align-self-start">
            <label htmlFor="eventMoon" className="form-label">
              Fase lunar
            </label>
            <select
              className="form-select"
              id="eventMoon"
              value={tempMoon}
              onChange={handleMoonChange}
            >
              <option value="">Selecciona una fase lunar</option>
              {moonPhases.map((phase, idx) => (
                <option key={idx} value={phase}>
                  {phase}
                </option>
              ))}
            </select>
            {moonError && <div className="text-danger">{moonError}</div>}
          </div>

          <div className="col-3 d-grid align-self-start">
            <button
              type="button"
              className="btn btn-primary mt-4"
              onClick={handleAddEvent}
            >
              Agregar
            </button>
          </div>
        </div>

        {/* Lista de eventos */}
        <div className="mt-3">
          {formData.events.length === 0 ? (
            <p className="text-muted">No hay eventos</p>
          ) : (
            <ul className="list-group">
              {formData.events.map((ev, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    <strong>Día:</strong> {ev.day}, <strong>Luna:</strong>{" "}
                    {ev.moon}
                  </span>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger text-white"
                    onClick={() => handleRemoveEvent(index)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </fieldset>
    </form>
  );
}

export default LunarCalendarForm;
