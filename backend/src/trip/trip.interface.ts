export interface PlaceDTO {
    business_status:    string;
    formatted_address:  string;
    name:               string;
    opening_hours: {
        open_now:       boolean;
    };
    place_id:           string;
    price_level:        number;
    rating:             number;
    types:              string[];
    user_ratings_total: number;
};

export interface GooglePlacesResponse {
    placesResult: PlaceDTO[];
    imagesUrls:   (string | null | undefined)[];
}