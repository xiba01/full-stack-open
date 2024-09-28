import { useState } from "react";
import SingleCountryDisplay from "./SingleCountryDisplay";

const MultipleCountriesDisplay = ({ countries }) => {
  return (
    <>
      {countries.map((country, index) => (
        <OneCountry country={country} key={index} />
      ))}
    </>
  );
};

const OneCountry = ({ country }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div>
      {country.name.common}{" "}
      <button onClick={handleShow}>{show ? "hide" : "show"}</button>
      {show ? <SingleCountryDisplay country={country} /> : null}
    </div>
  );
};

export default MultipleCountriesDisplay;
