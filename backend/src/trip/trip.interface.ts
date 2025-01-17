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

export interface WeatherData {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    } [];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    },
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust: number;
    },
    rain: {
        "1h": string;
    },
    clouds: {
        all: number;
    },
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    },
    timezone: number;
    id: number;
    name: string;
    cod: number;
    message?: string;
}
