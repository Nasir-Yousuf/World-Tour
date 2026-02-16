import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    setIsLoading(true);

    async function fetchingCities() {
      const res = await fetch(`${BASE_URL}/cities`);
      const data = await res.json();
      setCities(data);
      try {
      } catch (err) {
        alert("Something went wrong while fetching Data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchingCities();
  }, []);

  async function getCity(id) {
    setIsLoading(true);
    // This is the citiesContext feting data by id
    const res = await fetch(`${BASE_URL}/cities/${id}`);
    const data = await res.json();
    setCurrentCity(data);

    try {
    } catch (err) {
      alert("Some went wrong whoile fetching current city");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    setIsLoading(true);
    // This is the citiesContext feting data by id
    const res = await fetch(`${BASE_URL}/cities`, {
      method: "POST",
      body: JSON.stringify(newCity),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setCities((cities) => [...cities, data]);
    setCurrentCity(data);

    try {
    } catch (err) {
      alert("Some went wrong while createting the city");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    setIsLoading(true);

    await fetch(`${BASE_URL}/cities/${id}`, {
      method: "DELETE",
    });

    setCities((cities) => cities.filter((city) => city.id !== id));
    // setCurrentCity(data);

    try {
    } catch (err) {
      alert("Some went wrong while deleteting the city");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("You are using CitiesContext ouside the CitiesProvider");

  return context;
}

export { CitiesProvider, useCities };
