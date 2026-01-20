import React, { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const LIBRARIES = ["places", "marker"];
const LiveTracking = ({ ride }) => {
  const [currentPosition, setCurrentPosition] = useState({ lat: 20, lng: 78 });
  const [directions, setDirections] = useState(null);
    const [map, setMap] = useState(null);

  console.log("Current",currentPosition)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBLK1S-yomdapHzFvAor3cAMOTddcGr8hk',
    libraries: LIBRARIES,
  });

  useEffect(() => {
    if (!map || !window.google) return;

    const { AdvancedMarkerElement } = window.google.maps.marker;

    const marker = new AdvancedMarkerElement({
      map,
      position: currentPosition,
      title: "You are here",
    });

    return () => marker.setMap(null); // clean up
  }, [map, currentPosition]);


  useEffect(() => {
    if (!isLoaded) return;
    // 1. If we have a ride with pickup & destination, calculate the route
    if (ride?.pickUpCoordination && ride?.destinationCoordination) {
      const origin = {
        lat: ride.pickUpCoordination.ltd,
        lng: ride.pickUpCoordination.lng
      };
      const destination = {
        lat: ride.destinationCoordination.ltd,
        lng: ride.destinationCoordination.lng
      };

      setCurrentPosition(origin); // Focus map on pickup initially

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error("Directions request failed due to " + status);
          }
        }
      );
    }
    // 2. If no ride data, just show current user location (fallback)
    else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentPosition({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => console.error("Geolocation error:", error)
        );
      }
    }
  }, [ride, isLoaded]);

  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="w-full h-[70vh]">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          mapId: "51fd3fb5b043d3e1f4d0f1d5",
        }}
        onLoad={(mapInstance) => setMap(mapInstance)} // save map instance
      >
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: "#275ae5ff",
                strokeWeight: 4,
              },
              suppressMarkers: false, // default A/B markers
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

function createMarker(text) {
  const div = document.createElement("div");
  div.style.fontSize = "22px";
  div.style.fontWeight = "bold";
  div.style.transform = "translate(-50%, -100%)";
  div.textContent = text;
  return div;
}

export default LiveTracking;
