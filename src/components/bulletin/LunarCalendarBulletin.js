import React, { useContext } from "react";
import { FormDataContext } from "../../context/FormDataContext";

function LunarCalendarBulletin() {
  const { formData } = useContext(FormDataContext);

  // Supongamos que guardas el mes en "YYYY-MM"
  const calendarMonth = formData.calendarMonth || "2025-03"; // Ejemplo

  const [yearStr, monthStr] = calendarMonth.split("-");
  const yearNum = parseInt(yearStr, 10);
  const monthNum = parseInt(monthStr, 10) - 1; // 0-based

  // Fecha del primer día
  const firstDay = new Date(yearNum, monthNum, 1);
  // Día de la semana en que inicia (0=Dom, 1=Lun, ...)
  const dayOfWeek = firstDay.getDay();
  // Total de días del mes
  const daysInMonth = new Date(yearNum, monthNum + 1, 0).getDate();

  // Array de días vacíos para el offset
  const emptyCells = Array.from({ length: dayOfWeek }, () => null);
  // Array de días reales
  const dayCells = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  // Unimos ambos
  let allCells = [...emptyCells, ...dayCells];

  // Para que siempre tengamos filas completas (7 celdas),
  // rellenamos la última fila con celdas vacías si faltan
  while (allCells.length % 7 !== 0) {
    allCells.push(null);
  }

  // Partimos en filas de 7 celdas
  const rows = [];
  for (let i = 0; i < allCells.length; i += 7) {
    rows.push(allCells.slice(i, i + 7));
  }

  // Días de la semana (empezando en domingo)
  const weekDays = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

  // Nombre del mes en español
  const monthName = new Date(yearNum, monthNum, 1).toLocaleString("es-ES", {
    month: "long",
  });
  const monthLabel =
    monthName.charAt(0).toUpperCase() + monthName.slice(1) + " " + yearNum;

  return (
    <div className="p-2">
      <h5 className="text-center">{monthLabel}</h5>
      <table className="table table-bordered text-center">
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
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell || ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LunarCalendarBulletin;
