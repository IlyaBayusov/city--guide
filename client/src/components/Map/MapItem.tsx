import { useState, useEffect, useRef, useContext } from "react";
import { Circle, GoogleMap, Marker } from "@react-google-maps/api";
import { Context } from "../../context";
import i_userMarkCenter from "@/assets/i_userMarkCenter.png";
import Loader from "../Loader/Loader";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const MapItem = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [places, setPlaces] = useState([]);
  const [radius, setRadius] = useState(1000);
  const mapRef = useRef(null);

  const { mapCenter, zoom, arrCategoriesTypes, setArrCategoriesTypes } =
    useContext(Context);

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

      console.log("запрос ушел");

      const request = {
        location: mapCenter,
        radius: radius,
        type: arrCategoriesTypes,
      };

      service.nearbySearch(request, (results, status, pagination) => {
        console.log(pagination);

        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaces(results);
        }
      });
    }
  }, [isLoaded, arrCategoriesTypes]);

  const circleOptionsRadius = {
    fillColor: "blue",
    fillOpacity: 0.15,
    strokeColor: "blue",
    strokeOpacity: 1,
    strokeWeight: 1,
    clickable: false,
    zIndex: 1,
  };

  const circleOptionsMark = {
    fillColor: "red",
    fillOpacity: 1,
    strokeColor: "red",
    strokeOpacity: 1,
    strokeWeight: 1,
    zIndex: 2,
  };

  console.log(places);

  if (!isLoaded) return <Loader />;

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
      <Circle
        radius={radius}
        center={mapCenter}
        options={circleOptionsRadius}
      />
      <Marker
        position={mapCenter}
        icon={{
          url: i_userMarkCenter, // Путь к вашей картинке
          // scaledSize: new window.google.maps.Size(50, 50), // Размер изображения
        }}
        options={{ zIndex: 3 }}
      />

      {places.map((place) => (
        <Circle
          key={place.place_id}
          radius={3}
          center={{
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          }}
          options={circleOptionsMark}
        />
      ))}
    </GoogleMap>
  );
};

export default MapItem;
