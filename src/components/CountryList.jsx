import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Massage from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";

function CountriesList() {
  const { cities, isLoading } = useCities();
  console.log(cities);
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Massage message="Add your first city by clicking on the map" />;

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul style={styles.countriesList}>
      {countries.map((countries) => (
        <CountryItem country={countries} />
      ))}
    </ul>
  );
}

export default CountriesList;
