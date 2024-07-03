export interface IPlaceInfo {
  place_id: string;
  name: string;
  rating: number;
  formatted_address: string;
  business_status: string;
  photo: object[];
  position: {
    lat: number;
    lng: number;
  };
  types: string[];
  user_ratings_total: number | undefined;
  opening_hours: {
    periods: object[];
    weekday_text: string[];
  };
  icon: string;
}
