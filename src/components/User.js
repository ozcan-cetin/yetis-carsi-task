import React, { useEffect, useState } from "react";
import { calculateDistance } from "../utils/distanceCalculator";
import { useGlobalContext } from "../GlobalContext/GlobalContext";

const User = ({ user }) => {
  const { companyLocation, currentLocation } = useGlobalContext();
  const [distance, setDistance] = useState(null);
  const name = `${user.name.first} ${user.name.last}`;
  useEffect(() => {
    if (!currentLocation) {
      let lastLocation =
        companyLocation &&
        calculateDistance(
          companyLocation.lat,
          companyLocation.lng,
          user.coordinates.latitude,
          user.coordinates.longitude
        ).toFixed(2);
      setDistance(lastLocation);
    } else {
      let lastLocation = calculateDistance(
        currentLocation?.lat(),
        currentLocation?.lng(),
        user.coordinates.latitude,
        user.coordinates.longitude
      ).toFixed(2);
      setDistance(lastLocation);
    }
  }, [currentLocation]);

  return (
    <div className="flex items-center bg-white rounded-lg px-2">
      <div>
        <p className="font-bold text-[18px]">
          {name} <span className="font-normal">{distance} km</span>
        </p>
      </div>
    </div>
  );
};

export default User;
