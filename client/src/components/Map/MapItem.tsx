import { useState, useEffect, useRef, useContext } from "react";
import { Circle, GoogleMap, Marker } from "@react-google-maps/api";
import { Context } from "../../context";
import i_userMarkCenter from "@/assets/i_userMarkCenter.png";
import Loader from "../Loader/Loader";
import { IPlaceInfo } from "../../models/IPlaceInfo";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

type Props = { modalInfoPlace: boolean; setModalInfoPlace: () => boolean };

const MapItem = ({ modalInfoPlace, setModalInfoPlace }: Props) => {
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
    placeInfo,
    setPlaceInfo,
    userCenter,
    isLoadedMap,
    setIsLoadedMap,
  } = useContext(Context);

  useEffect(() => {
    const loadGoogleMapsAPI = async () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${
          import.meta.env.VITE_FIREBASE_GOOGLEMAPS_API_KEY
        }&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => setIsLoadedMap(true);
        document.head.appendChild(script);
      } else {
        setIsLoadedMap(true);
      }
    };

    loadGoogleMapsAPI();
  }, []);

  useEffect(() => {
    if (isLoadedMap && mapRef.current) {
      const map = mapRef.current;
      const service = new window.google.maps.places.PlacesService(map);

      const request = {
        location: mapCenter,
        radius: inputRadius,
        type: arrCategoriesTypes,
      };

      service.nearbySearch(request, async (results, status, pagination) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          console.log("result, ", results);

          const detailedPlaces = await Promise.all(
            results.map((place) => getPlaceDetails(service, place.place_id))
          );
          setPlaces(detailedPlaces);
        }
      });
    }
  }, [isLoadedMap, arrCategoriesTypes]);

  const getPlaceDetails = (service, placeId) => {
    return new Promise((resolve) => {
      service.getDetails({ placeId }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          // const photoUrl =
          //   place.photos && place.photos.length > 0
          //     ? place.photos[0].getUrl()
          //     : null;
          resolve({
            place_id: place.place_id,
            name: place.name,
            rating: place.rating,
            formatted_address: place.formatted_address,
            business_status: place.business_status,
            photo: place.photos,
            position: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            },
            types: place.types,
            user_ratings_total: place.user_ratings_total,
            opening_hours: place.opening_hours || null,
            isOpen: place.opening_hours ? place.opening_hours.isOpen() : null,
            icon: place.icon,
          });
        } else {
          resolve(null);
        }
      });
    });
  };

  const showModalInfoPlace = (place) => {
    setPlaceInfo(place);
    setModalInfoPlace();
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

  if (!isLoadedMap) return <Loader />;

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
        center={userCenter}
        options={circleOptionsRadius}
      />
      <Marker
        position={userCenter}
        icon={{
          url: i_userMarkCenter,
        }}
        options={{ zIndex: 3 }}
      />

      {places.map((place) => (
        <Circle
          key={place.place_id}
          radius={8}
          center={{
            lat: place.position.lat,
            lng: place.position.lng,
          }}
          options={circleOptionsMark}
          onClick={() => {
            showModalInfoPlace(place);
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default MapItem;
