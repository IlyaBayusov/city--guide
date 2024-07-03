import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { IPlaceInfo } from "./models/IPlaceInfo";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addFavoritePlace = async (place: IPlaceInfo) => {
  console.log("testttt", {
    place_id: place.place_id,
    name: place.name,
    rating: place.rating !== undefined ? place.rating : "Не оценено",
    formatted_address: place.formatted_address,
    photo: place.photo || "",
    position: place.position,
    types: place.types,
    user_ratings_total:
      place.user_ratings_total !== undefined ? place.user_ratings_total : 0,
    business_status:
      place.business_status !== undefined
        ? place.business_status
        : "Не известно",
    opening_hours: place.opening_hours
      ? {
          periods: place.opening_hours.periods,
          weekday_text: place.opening_hours.weekday_text,
        }
      : "",
    icon: place.icon ? place.icon : "",
  });

  try {
    await addDoc(collection(db, "favoritePlaces"), {
      place_id: place.place_id,
      name: place.name,
      rating: place.rating !== undefined ? place.rating : "Не оценено",
      formatted_address: place.formatted_address,
      photo: place.photo || "",
      position: place.position,
      types: place.types,
      user_ratings_total:
        place.user_ratings_total !== undefined ? place.user_ratings_total : 0,
      business_status:
        place.business_status !== undefined
          ? place.business_status
          : "Не известно",
      opening_hours: place.opening_hours
        ? {
            periods: place.opening_hours.periods,
            weekday_text: place.opening_hours.weekday_text,
          }
        : "",
      icon: place.icon ? place.icon : "",
    });

    console.log("Успешно добавлено в израбнное");
    return true;
  } catch (e) {
    console.error("Ошибка FireBase: ", e);
    return false;
  }
};

export const fetchFavoritePlaces = async () => {
  const querySnapshot = await getDocs(collection(db, "favoritePlaces"));
  const places = querySnapshot.docs.map((doc) => doc.data());

  console.log("places", places);

  const placeRes = places.map((place) => ({
    place_id: place.place_id,
    name: place.name,
    rating: place.rating,
    formatted_address: place.formatted_address,
    business_status: place.business_status,
    photo: place.photos,
    position: place.position,
    types: place.types,
    user_ratings_total: place.user_ratings_total,
    opening_hours: place.opening_hours || null,
    icon: place.icon,
  }));
  console.log(placeRes);

  return placeRes;
};

export const deleteFavoritePlace = async (placeId) => {
  try {
    const q = query(
      collection(db, "favoritePlaces"),
      where("id", "==", placeId)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (docSnapshot) => {
        await deleteDoc(doc(db, "favoritePlaces", docSnapshot.id));
        console.log(`Место с id ${placeId} успешно удалено из избранного`);
      });
      return true;
    } else {
      console.log(`Место с id ${placeId} не найдено`);
      return false;
    }
  } catch (e) {
    console.error("Ошибка FireBase при удалении: ", e);
    return false;
  }
};
