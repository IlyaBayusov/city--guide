export interface IPlaceInfo {
  id: string;
  name: string;
  rating: number;
  address: string;
  photo: string;
  position: {
    lat: number;
    lng: number;
  };
  types: string[];
  userRatingTotal: number | undefined;
  openingHours: {
    periods: object[];
    weekday_text: string[];
  };
  isOpen: boolean | null;
  icon: string;
}
