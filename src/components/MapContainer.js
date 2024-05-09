import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import { useGlobalContext } from "../GlobalContext/GlobalContext";
import { CoordinateList } from "./CoordinateList";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapContainer = () => {
  const { companyLocation, userLocations, setStockStatus, startDelivery, setShowMessage, setCurrentLocation } = useGlobalContext();

  const [directions, setDirections] = useState(null);
  const [routeIndex, setRouteIndex] = useState(0);
  const [carPosition, setCarPosition] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const steps = (directions && directions.routes) && directions.routes[0].legs[0].steps.map((item)=>{
    return(
      {lat: item.end_location.lat().toFixed(4), lng: item.end_location.lng().toFixed(4)}
    )
  })

  const simulateRoute = () => {
    if (directions && directions.routes && directions.routes[0]) {
      const route = directions.routes[0];
      if (routeIndex < route.legs[0].steps.length) {
        const nextStep = route.legs[0].steps[routeIndex];
        const nextLocation = nextStep.end_location;
        setRouteIndex((prevIndex) => prevIndex + 1);
        setCarPosition(nextLocation);
        setCurrentLocation(nextLocation)
        if(routeIndex === (route.legs[0].steps.length -1)){
            setShowMessage(true)
            setStockStatus(prevStockStatus => prevStockStatus - 1);
        }
      }
    }
  };

  useEffect(() => {
    if(startDelivery){
      const interval = setInterval(simulateRoute, 10000);
      return () => clearInterval(interval);
    }
  }, [directions, routeIndex, startDelivery]);

  const carIcon = {
    url: require("../assets/delivery.png"),
    scaledSize: isLoaded && new window.google.maps.Size(32, 32),
    origin: isLoaded && new window.google.maps.Point(0, 0),
    anchor: isLoaded && new window.google.maps.Point(16, 32),
  };
  const stepIcon = {
    url: require("../assets/pin.png"),
    scaledSize: isLoaded && new window.google.maps.Size(32, 32),
    origin: isLoaded && new window.google.maps.Point(0, 0),
    anchor: isLoaded && new window.google.maps.Point(16, 32),
  };
  const stepRedIcon = {
    url: require("../assets/red-pin.png"),
    scaledSize: isLoaded && new window.google.maps.Size(32, 32),
    origin: isLoaded && new window.google.maps.Point(0, 0),
    anchor: isLoaded && new window.google.maps.Point(16, 32),
  };

  const directionsCallback = (response) => {
    if (response !== null && response.status === "OK") {
      setDirections(response);
    }
  };
  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
        <CoordinateList coordinates={steps} routeIndex={routeIndex}/>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={companyLocation}
      zoom={8}
    >
      {userLocations.map((location, index) => (
        <Marker key={index} position={location} />
      ))}
      {directions && (
          <DirectionsRenderer directions={directions} />
      )}
      {directions === null && (
        <DirectionsService
          options={{
            destination: userLocations[userLocations.length - 1],
            origin: companyLocation,
            waypoints: userLocations
              .slice(0, -1)
              .map((location) => ({ location })),
            travelMode: "DRIVING",
          }}
          callback={directionsCallback}
        />
      )}
      {directions &&
        directions.routes[0].legs[0].steps.map((step, index) => (
          index > routeIndex ?
          <Marker key={index} position={step.start_location} icon={stepIcon} /> : <Marker key={index} position={step.start_location} icon={stepRedIcon} />
        ))}
        {directions &&
  directions.routes[0].legs.slice(1).map((leg, legIndex) => (
    leg.steps.map((step, stepIndex) => (
      <Marker key={stepIndex} position={step.start_location} icon={stepIcon} />
    ))
  ))}
      {carPosition && <Marker position={carPosition} icon={carIcon} />}
      {(!startDelivery && directions) && <Marker position={companyLocation} icon={carIcon} />}
    </GoogleMap>
    </>
  );
};

export default MapContainer;
