import { useEffect, useState } from "react";
import axios from "axios";
import ResultLogic from "./components/ResultLogic.jsx";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterCountry, setFilterCountry] = useState("");

  const handleFilterChange = (event) => {
    setFilterCountry(event.target.value);
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);

  return (
    <>
      <form>
        find countries{" "}
        <input value={filterCountry} onChange={handleFilterChange} />
      </form>
      <div>
        <ResultLogic filter={filterCountry} countries={countries} />
      </div>
    </>
  );
};

export default App;
