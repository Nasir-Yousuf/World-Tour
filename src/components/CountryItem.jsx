import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  console.log("this is the countries that has been passed" + country);
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
