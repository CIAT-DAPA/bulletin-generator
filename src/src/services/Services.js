import axios from "axios";

const MOON_API_URL = "https://api.farmsense.net/v1/moonphases/?d=";

class Services {
  async get_phase_moon_by_month(month) {
    const [year, mon] = month.split("-");
    const yearNum = parseInt(year, 10);
    const monthNum = parseInt(mon, 10);

    const lastDay = new Date(yearNum, monthNum, 0).getDate();

    const nextMonthDate = new Date(yearNum, monthNum, 1);
    const nextYearNum = nextMonthDate.getFullYear();
    const nextMonthNum = nextMonthDate.getMonth() + 1;

    const formatDate = (y, m, d) => {
      const mm = String(m).padStart(2, "0");
      const dd = String(d).padStart(2, "0");
      return `${y}-${mm}-${dd}T00:00:00Z`;
    };

    const requests = [];
    for (let day = 1; day <= lastDay; day++) {
      let queryYear = yearNum;
      let queryMonth = monthNum;
      let queryDay = day + 1;

      if (queryDay > lastDay) {
        queryDay = 1;
        queryYear = nextYearNum;
        queryMonth = nextMonthNum;
      }

      const dateStr = formatDate(queryYear, queryMonth, queryDay);
      const unixTimestamp = Math.floor(new Date(dateStr).getTime() / 1000);
      const requestUrl = `${MOON_API_URL}${unixTimestamp}`;
      requests.push(axios.get(requestUrl));
    }

    const responses = await Promise.all(requests);

    const result = responses.map((res, index) => {
      const realDay = index + 1;
      const dayStr = String(realDay).padStart(2, "0");
      return {
        date: `${year}-${mon}-${dayStr}`,
        phase: res.data[0].Phase,
      };
    });

    return result;
  }
}

export default new Services();
