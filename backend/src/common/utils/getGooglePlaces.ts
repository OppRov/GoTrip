export default async function getGooglePlaces(place: string): Promise<any> {
    try {
        const response: Response = await fetch( `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&input=${place.split(" ").join("%20")}&inputtype=textquery&key=${process.env.GOOGLE_API_KEY}`);
        const data = await response.json();
        return data;
    } catch (err: any) {
        return err;
    }
}