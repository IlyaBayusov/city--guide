import React, { useCallback, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapItem = () => {
  const mapRef = useRef();
  const [mapCenter, setMapCenter] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDwvdUv3uftChhHm4JfYaufOt1rZcAkhtY",
    language: "ru",
  });

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Ошибка при получении геопозиции:", error);
        }
      );
    } else {
      console.error("Геолокация не поддерживается вашим браузером");
    }
  };

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = null;
  }, []);

  return isLoaded ? (
    <div>
      <button onClick={getCurrentLocation}>Центрировать по геолокации</button>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {mapCenter && <Marker position={mapCenter} />}
      </GoogleMap>
    </div>
  ) : (
    <div>Загрузка...</div>
  );
};

export default MapItem;
