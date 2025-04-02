import axios from "axios";

const MOON_API_URL = "https://api.farmsense.net/v1/moonphases/?d=";

class Services {
  async get_phase_moon_by_month(month) {
    const [year, mon] = month.split("-");
    const yearNum = parseInt(year, 10);
    const monthNum = parseInt(mon, 10);
    const lastDay = new Date(yearNum, monthNum, 0).getDate();
    const requests = [];
    for (let day = 1; day <= lastDay; day++) {
      const dayStr = day.toString().padStart(2, "0");
      const dateStr = `${year}-${mon}-${dayStr}T00:00:00Z`;
      const unixTimestamp = Math.floor(new Date(dateStr).getTime() / 1000);
      const requestUrl = `${MOON_API_URL}${unixTimestamp}`;
      requests.push(axios.get(requestUrl));
    }

    const responses = await Promise.all(requests);
    const result = responses.map((res, index) => {
      const dayStr = (index + 1).toString().padStart(2, "0");
      return {
        date: `${year}-${mon}-${dayStr}`,
        phase: res.data[0].Phase,
      };
    });
    return result;
  }
}

export default new Services();
