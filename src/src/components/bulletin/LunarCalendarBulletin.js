import React, { useContext } from "react";
import { FormDataContext } from "../../context/FormDataContext";
import lunaNueva from "../../assets/lunaNueva.png";
import creciente from "../../assets/creciente.png";
import cuartoCreciente from "../../assets/cuartoCreciente.png";
import gibosaCreciente from "../../assets/gibosaCreciente.png";
import lunaLlena from "../../assets/lunaLlena.png";
import gibosaMenguante from "../../assets/gibosaMenguante.png";
import cuartoMenguante from "../../assets/cuartoMenguante.png";
import menguante from "../../assets/menguante.png";
import lluviaIco from "../../assets/lluviaIco.png";
import calendarMoonIco from "../../assets/calendarMoonIco.png";
import "./LunarCalendarBulletin.css";

function LunarCalendarBulletin() {
  const { formData } = useContext(FormDataContext);
  const calendarMonth = formData.calendarMonth;
  const isLoading = formData.loadingMoons;

  const moonImages = {
    "Luna Nueva": lunaNueva,
    Creciente: creciente,
    "Cuarto Creciente": cuartoCreciente,
    "Gibosa Creciente": gibosaCreciente,
    "Luna Llena": lunaLlena,
    "Gibosa Menguante": gibosaMenguante,
    "Cuarto Menguante": cuartoMenguante,
    Menguante: menguante,
  };

  const moonDisplayNames = {
    "Luna Nueva": "Nueva",
    "Luna Llena": "Llena",
    "Cuarto Creciente": "Crec.",
    "Cuarto Menguante": "Meng.",
  };

  let rows = [];
  let monthName = "";
  if (calendarMonth) {
    const [yearStr, monthStr] = calendarMonth.split("-");
    const yearNum = parseInt(yearStr, 10);
    const monthNum = parseInt(monthStr, 10) - 1;

    const firstDay = new Date(yearNum, monthNum, 1);
    const dayOfWeek = firstDay.getDay();
    const daysInMonth = new Date(yearNum, monthNum + 1, 0).getDate();

    const emptyCells = Array.from({ length: dayOfWeek }, () => null);
    const dayCells = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    let allCells = [...emptyCells, ...dayCells];

    while (allCells.length % 7 !== 0) {
      allCells.push(null);
    }

    for (let i = 0; i < allCells.length; i += 7) {
      rows.push(allCells.slice(i, i + 7));
    }

    monthName = new Date(yearNum, monthNum, 1).toLocaleString("es-ES", {
      month: "long",
    });
  }

  const weekDays = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

  return (
    <div className="d-flex flex-column justify-content-start h-100 p-2 gap-0">
      {/* Sección Superior */}
      <div className="text-center d-flex justify-content-around align-items-center bg-dark-transparent text-white rounded-1 px-4 py-2">
        <div>
          <img src={lluviaIco} alt="Lluvia" style={{ height: "38px" }} />
        </div>
        <div>
          <div className="bg-comunitario text-end rounded-1 px-1">
            <span className="fs-7">El Boletín Comunitario</span>
          </div>
          <h4 className="m-0 fw-light">
            <span className="fw-bold text-uppercase">
              {formData.rainSeason || "{Temporada}"}
            </span>{" "}
            {"época de lluvias"}
          </h4>
        </div>
      </div>

      {/* Sección Calendario */}
      <div className="text-center">
        <div className="d-flex justify-content-center align-items-center bg-dark-transparent text-white rounded-1 gap-2 py-1">
          <img
            src={calendarMoonIco}
            alt="calendario lunar"
            style={{ height: "24px" }}
          />
          <span className="fw-normal">Calendario lunar</span>
        </div>

        <span className="text-center text-white text-uppercase my-2">
          {calendarMonth ? `${monthName}` : ""}
        </span>

        <div className="lunar-calendar-container">
          {calendarMonth ? (
            isLoading ? (
              <div className="d-flex justify-content-center align-items-center h-100">
                <div class="spinner-border" style={{height:"20px", width:"20px"}} role="status"></div>
                <p className="text-white m-2">Cargando fases lunares...</p>
              </div>
            ) : (
              <table className="table-bordered text-center lunar-calendar-table w-100">
                <thead>
                  <tr>
                    {weekDays.map((wd) => (
                      <th key={wd}>{wd}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => {
                        if (!cell) {
                          return <td key={cellIndex}></td>;
                        }
                        const event = formData.events.find(
                          (ev) => parseInt(ev.day, 10) === cell
                        );
                        return (
                          <td key={cellIndex} style={{ height: "74px" }}>
                            <div className="d-flex flex-column align-items-center justify-content-evenly">
                              <div className="lunar-calendar-day fw-bold w-100 text-start ps-1">
                                {cell}
                              </div>
                              {event && (
                                <>
                                  <img
                                    src={moonImages[event.moon]}
                                    alt={event.moon}
                                    className="lunar-calendar-moon"
                                  />
                                  <div className="lunar-calendar-moon-name">
                                    {moonDisplayNames[event.moon] || "‎"}
                                  </div>
                                </>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          ) : (
            <p className="text-white m-2">
              Por favor ingrese mes del calendario
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LunarCalendarBulletin;
