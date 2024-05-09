import React from "react";
import User from "./User";
import { calculateDistance } from "../utils/distanceCalculator";
import { useGlobalContext } from "../GlobalContext/GlobalContext";

const UserList = () => {
  const { users, companyLocation, stockStatus, setStartDelivery } = useGlobalContext();

  const sortedUsers =
    companyLocation &&
    users.sort((a, b) => {
      const distanceA = calculateDistance(
        companyLocation?.lat,
        companyLocation?.lng,
        a.coordinates.latitude,
        a.coordinates.longitude
      );
      const distanceB = calculateDistance(
        companyLocation?.lat,
        companyLocation?.lng,
        b.coordinates.latitude,
        b.coordinates.longitude
      );
      return distanceA - distanceB;
    });

  const usersWithCoordinates = sortedUsers.map((user) => ({
    lat: user.coordinates.latitude,
    lng: user.coordinates.longitude,
  }));
  localStorage.setItem("userLocations", JSON.stringify(usersWithCoordinates));
  return (
    <div>
      <div className="flex items-center justify-between px-5 my-3">
        <div className="font-bold">CUSTOMERS</div>
      </div>
      <div className="flex flex-col gap-2">
        {sortedUsers.map((user) => (
          <User
            key={user.login.uuid}
            user={user}
            companyLocation={companyLocation}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
