import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { randomUserData } from "../constant/randomUsers";
import { randomCoordinates } from "../constant/coordinates";

// Context oluşturma
const GlobalContext = createContext();

// Context Provider bileşeni oluşturma
export const GlobalContextProvider = ({ children }) => {
  const defaultLocation = {
    lat: 41.0145,
    lng: 28.9533,
  };
  const [companyIp, setCompanyIp] = useState();
  const [stockStatus, setStockStatus] = useState(10);
  const [startDelivery, setStartDelivery] = useState(false);
  const [companyLocation, setCompanyLocation] = useState(defaultLocation);
  const [users, setUsers] = useState([]);
  const [userLocations, setUserLocations] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  function getLocations() {
    const storedLocations = JSON.parse(
      localStorage.getItem("userLocations")
    )?.map((item) => ({
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lng),
    }));
    setUserLocations(storedLocations);
  }

  useEffect(() => {
    getLocations();
    const timerId = setTimeout(getLocations, 3000);

    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=10")
      .then((response) => {
        // setUsers(response.data.results);
        shuffleCoordinates(response.data.results, randomCoordinates);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
    // setUsers(randomUserData.results)
    axios
      .get("https://api.ipify.org/")
      .then((response) => {
        setCompanyIp(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const shuffleCoordinates = (users, randomCoordinates) => {
    const shuffledUsers = users.map((user) => {
      const randomIndex = Math.floor(Math.random() * randomCoordinates.length);
      const newLatLng = randomCoordinates[randomIndex];
      return {
        ...user,
        coordinates: {
          latitude: newLatLng.lat,
          longitude: newLatLng.lng,
        },
      };
    });
    // return shuffledUsers;
    return setUsers(shuffledUsers);
  };
  useEffect(() => {
    if (companyIp) {
      axios
        .get(`http://ip-api.com/json/${companyIp}`)
        .then((response) => {
          let currentLocation = {
            lat: response.data.lat,
            lng: response.data.lon,
          };
          setCompanyLocation(currentLocation);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, [companyIp]);

  return (
    <GlobalContext.Provider
      value={{
        companyLocation,
        users,
        userLocations,
        stockStatus,
        setStockStatus,
        startDelivery,
        setStartDelivery,
        showMessage,
        setShowMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// useContext hook'unu kullanarak context'e erişme
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
