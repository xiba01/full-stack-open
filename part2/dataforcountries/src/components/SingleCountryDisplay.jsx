import { useEffect, useState } from "react";
import axios from "axios";

const SingleCountryDisplay = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const APIKey = import.meta.env.VITE_SOME_KEY;
      const capital = country.capital[0];
      const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${APIKey}&units=metric`;

      const response = await axios.get(APIUrl);
      setWeather(response.data);
      console.log(response.data);
    };

    fetchWeather();
  }, [country]);

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
      </div>
      <div>
        <h2>languages:</h2>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
      </div>
      <img src={country.flags.png} />
      {weather ? (
        <div>
          <h2>Weather in {country.name.common}</h2>
          <div>temperature {weather.main.temp}</div>
          <div>wind {weather.wind.speed} m/s</div>
          <br />
        </div>
      ) : null}
    </>
  );
};

export default SingleCountryDisplay;
