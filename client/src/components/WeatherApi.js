import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherApi = () => {
  const [weather, setWeather] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err.response));
  }, []);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${user.city},us&appid=2e5c7ad234223fdf6906e33dad0fc81e&units=imperial`
      );
      setWeather(result.data.main);
    }
    fetchData();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <p>
        <strong>{user.city} Weather</strong>
      </p>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Low</th>
            <th scope="col">High</th>
            <th scope="col">Feels Like</th>
          </tr>
        </thead>
        <tbody>
          {weather && (
            <tr>
              <th scope="row">
                {weather.temp_min}
                <sup>o</sup>F
              </th>
              <td>
                {weather.temp_max}
                <sup>o</sup>F
              </td>
              <td>
                {weather.feels_like}
                <sup>o</sup>F{" "}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ textAlign: "left" }}>
        <p>
          Currently: {weather.temp}
          <sup>o</sup> F
        </p>
        <p>Humidity: {weather.humidity}%</p>
        <p>Pressure: {weather.pressure}hPa (mb) </p>
      </div>
    </div>
  );
};

export default WeatherApi;
