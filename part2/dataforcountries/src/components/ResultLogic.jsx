import SingleCountryDisplay from "./SingleCountryDisplay";
import MultipleCountriesDisplay from "./MultipleCountriesDisplay";

const ResultLogic = ({ filter, countries }) => {
  let filtered = [];

  if (filter.length > 0) {
    filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
  } else {
    filtered = countries;
  }

  if (filtered.length > 10 && filtered.length !== countries.length) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filtered.length === 1) {
    const country = filtered[0];

    return <SingleCountryDisplay country={country} />;
  } else {
    return <MultipleCountriesDisplay countries={filtered} />;
  }
};

export default ResultLogic;
