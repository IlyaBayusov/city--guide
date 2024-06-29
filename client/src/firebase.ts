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

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRECASE_API_KEY,
  authDomain: import.meta.env.VITE_FIRECASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIRECASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIRECASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIRECASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIRECASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addFavoritePlace = async (place) => {
  try {
    const addPlace = await addDoc(collection(db, "favoritePlaces"), {
      id: place.id,
      name: place.name,
      rating: place.rating !== undefined ? place.rating : "Не оценено",
      address: place.address,
      photo: place.photo || "",
      position: place.position,
      types: place.types,
      userRatingTotal:
        place.userRatingTotal !== undefined ? place.userRatingTotal : 0,
      businessStatus:
        place.businessStatus !== undefined
          ? place.businessStatus
          : "Не известно",
    });
    console.log(addPlace);

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
  console.log(places);
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
