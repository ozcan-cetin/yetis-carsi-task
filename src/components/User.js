import React, { useEffect, useState } from "react";
import { calculateDistance } from "../utils/distanceCalculator";
import { useGlobalContext } from "../GlobalContext/GlobalContext";

const User = ({ user}) => {
  const {companyLocation} = useGlobalContext()
    const name = `${user.name.first} ${user.name.last}`;
    const distance = companyLocation && calculateDistance(
      companyLocation.lat,
      companyLocation.lng,
      user.coordinates.latitude,
      user.coordinates.longitude
    ).toFixed(2);

  return (
    <div className="flex items-center bg-white rounded-lg px-2">
      <div>
        <p className="font-bold text-[18px]">{name} <span className="font-normal">{distance} km</span></p>
      </div>
    </div>
  );
};

export default User;
