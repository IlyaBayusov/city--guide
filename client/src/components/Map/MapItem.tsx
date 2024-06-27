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
  const mapRef = useRef(null);

  const {
    inputRadius,
    setInputRadius,
    mapCenter,
    zoom,
    arrCategoriesTypes,
    setArrCategoriesTypes,
    places,
    setPlaces,
  } = useContext(Context);

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
        radius: inputRadius,
        type: arrCategoriesTypes,
      };

      service.nearbySearch(request, async (results, status, pagination) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const detailedPlaces = await Promise.all(
            results.map((place) => getPlaceDetails(service, place.place_id))
          );
          setPlaces(detailedPlaces);
        }
      });
    }
  }, [isLoaded, arrCategoriesTypes]);

  const getPlaceDetails = (service, placeId) => {
    return new Promise((resolve) => {
      service.getDetails({ placeId }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const photoUrl =
            place.photos && place.photos.length > 0
              ? place.photos[0].getUrl()
              : null;
          resolve({
            id: place.place_id,
            name: place.name,
            rating: place.rating,
            address: place.formatted_address,
            photo: photoUrl,
            position: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            },
          });
        } else {
          resolve(null);
        }
      });
    });
  };

  const showModalInfoPlace = () => {
    console.log("click");
  };

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
        radius={inputRadius}
        center={mapCenter}
        options={circleOptionsRadius}
      />
      <Marker
        position={mapCenter}
        icon={{
          url: i_userMarkCenter,
          // scaledSize: new window.google.maps.Size(50, 50),
        }}
        options={{ zIndex: 3 }}
      />

      {places.map((place) => (
        <Circle
          key={place.id}
          radius={8}
          center={{
            lat: place.position.lat,
            lng: place.position.lng,
          }}
          options={circleOptionsMark}
          onClick={showModalInfoPlace}
        />
      ))}
    </GoogleMap>
  );
};

export default MapItem;
