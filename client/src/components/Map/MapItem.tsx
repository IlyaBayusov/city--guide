// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
// import { useEffect, useRef, useState } from "react";

// const MapItem = () => {
//   const [mapCenter, setMapCenter] = useState({ lat: 53.9, lng: 27.56 });
//   const [zoom, setZoom] = useState(9);
//   const mapRef = useRef();

//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: import.meta.env.VITE_FIRECASE_GOOGLEMAPS_API_KEY,
//     language: "ru",
//   });

//   useEffect(() => {
//     const getPlaces = async () => {
//       const req = fetch(`https://places.googleapis.com/v1/places:searchNearby`);

//       console.log(req);
//     };

//     getPlaces();
//   }, []);

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setMapCenter({ lat: latitude, lng: longitude });
//           console.log(mapCenter);
//         },
//         (error) => {
//           console.error("Ошибка при получении геопозиции:", error);
//         }
//       );
//     } else {
//       console.error("Геолокация не поддерживается вашим браузером");
//     }
//   };

//   const onLoad = function callback(map) {
//     mapRef.current = map;
//   };

//   const onUnmount = function callback(map) {
//     mapRef.current = null;
//   };

//   return isLoaded ? (
//     <div className="w-full h-full">
//       <button
//         className="absolute top-1/2 left-1/2 z-[1002]"
//         onClick={() => {
//           // setZoom(zoom + 1);
//           getCurrentLocation();
//         }}
//       >
//         Центрировать по геолокации
//       </button>
//       <GoogleMap
//         mapContainerStyle={{ width: "100%", height: "100%" }}
//         center={mapCenter}
//         zoom={9}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//         options={{ disableDefaultUI: true, zoom: zoom }}
//       >
//         {mapCenter && <Marker position={mapCenter} />}
//       </GoogleMap>
//     </div>
//   ) : (
//     <div>Загрузка...</div>
//   );
// };

// export default MapItem;

import { useState, useEffect, useRef, useContext } from "react";
import { Circle, GoogleMap } from "@react-google-maps/api";
import { Context } from "../../context";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const MapItem = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [places, setPlaces] = useState([]);
  const mapRef = useRef(null);

  const { mapCenter, zoom } = useContext(Context);

  useEffect(() => {
    const loadGoogleMapsAPI = async () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDwvdUv3uftChhHm4JfYaufOt1rZcAkhtY&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => setIsLoaded(true);
        document.head.appendChild(script);
      } else {
        setIsLoaded(true);
      }
    };

    loadGoogleMapsAPI();
  }, []);

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const map = mapRef.current;
      const service = new window.google.maps.places.PlacesService(map);

      const request = {
        location: mapCenter,
        radius: 1000,
        type: [
          "tourist_attraction",
          "art_gallery",
          "museum",
          "performing_arts_theater",
          "national_park",
          "night_club",
        ],
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaces(results);
        }
      });
    }
  }, [isLoaded]);

  if (!isLoaded) return "Loading Maps...";

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={mapCenter}
      zoom={zoom}
      onLoad={(map) => {
        mapRef.current = map;
      }}
      options={{ disableDefaultUI: true, clickableIcons: false, styles: [] }}
    >
      {places.map((place) => (
        <Circle
          key={place.place_id}
          radius={20}
          center={{
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default MapItem;
