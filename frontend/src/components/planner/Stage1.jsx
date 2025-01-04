import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { DateRangePicker } from "@nextui-org/react";
import { useState, useContext, useEffect } from "react";
import { planContext } from "../../contexts/planContext";
import { TRIPS_URL } from "../../../constants/endpoints";
import axiosFetch from "../../api/axiosFetch";

const Stage1 = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [days, setDays] = useState(0);
  const [destinationEntered, setDestinationEntered] = useState(false);

  const { setPlanData, planData } = useContext(planContext);

  const destinations = [
    {
      city: "Rio de Janeiro, Brazil",
      image:
        "https://www.ocregister.com/wp-content/uploads/2023/04/OCR-L-TR-SOUTH-AMERICA-0423-FEATURED.jpg?w=1024",
    },
    {
      city: "Siem Reap, Cambodia",
      image:
        "https://images.skypicker.com/?image=https%3A%2F%2Fimages.kiwi.com%2Fphotos%2Foriginals%2Fauckland_nz.jpg&width=992&height=600&quality=80&fit=crop&format=original",
    },
    {
      city: "Cairo, Egypt",
      image:
        "https://uceap.universityofcalifornia.edu/sites/default/files/marketing-images/life-in-city-images/cairo-egypt-glance.jpg",
    },
    {
      city: "Bali, Indonesia",
      image:
        "https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_1000/v1697511622/catalog/1714102867122348032/bntsymes005x1boalhvb.jpg",
    },
    {
      city: "Prague, Czech Republic",
      image:
        "https://uceap.universityofcalifornia.edu/sites/default/files/marketing-images/life-in-city-images/prague-czech-republic-glance.jpg",
    },
    {
      city: "Istanbul, Turkey",
      image:
        "https://uceap.universityofcalifornia.edu/sites/default/files/marketing-images/life-in-city-images/istabul-glance.png",
    },
    {
      city: "Dubai, UAE",
      image:
        "https://nomadcapitalist.com/wp-content/uploads/Living-in-Dubai-UAE-An-Expat-Guide-Nomad-Capitalist.png",
    },
    {
      city: "Lucerne, Switzerland",
      image: "https://www.bu.edu/abroad/files/2016/05/banner-geneva4.jpg",
    },
    {
      city: "Budapest, Hungary",
      image:
        "https://thumbs.dreamstime.com/b/budapest-city-collage-set-images-42792425.jpg",
    },
    {
      city: "Reykjavik, Iceland",
      image:
        "https://as1.ftcdn.net/v2/jpg/01/79/75/36/1000_F_179753698_tGfioVWBZCdD9Udl83S8QqgWbBJ1u7kd.jpg",
    },
    {
      city: "Berlin, Germany",
      image:
        "https://www.globeguide.ca/wp-content/uploads/2016/10/Berlin-Germany-683x1024.jpg",
    },
    {
      city: "Boracay, Philippines",
      image:
        "https://i.insider.com/5c785fb0bde70f66a407e175?width=800&format=jpeg&auto=webp",
    },
    {
      city: "Patagonia, Argentina & Chile",
      image:
        "https://www.ocregister.com/wp-content/uploads/2023/04/OCR-L-TR-SOUTH-AMERICA-0423-FEATURED.jpg?w=1024",
    },
    {
      city: "Copenhagen, Denmark",
      image: "https://next.io/wp-content/uploads/2022/03/Copenhagen-DGA.png",
    },
    {
      city: "Singapore",
      image:
        "https://avlnavlblob.blob.core.windows.net/allied-com/images/librariesprovider2/default-album/singapore-marina-bay-cropped.jpg?sfvrsn=d9814bfb_0",
    },
    {
      city: "Montreal, Canada",
      image:
        "https://content.r9cdn.net/rimg/dimg/0b/56/99204762-city-6966-1629768d60c.jpg?width=1200&height=630&xhint=2136&yhint=1537&crop=true",
    },
    {
      city: "Fiji",
      image:
        "https://thumbs.dreamstime.com/b/yokohama-city-surreal-view-24545510.jpg",
    },
    {
      city: "Lisbon, Portugal",
      image: "https://www.sygnum.com/wp-content/uploads/2023/03/image-1.png",
    },
    {
      city: "Galapagos Islands, Ecuador",
      image:
        "https://www.ocregister.com/wp-content/uploads/2023/04/OCR-L-TR-SOUTH-AMERICA-0423-FEATURED.jpg?w=1024",
    },
    {
      city: "Jerusalem, Israel",
      image:
        "https://cdn.pixabay.com/photo/2016/10/03/21/13/jerusalem-1712855_1280.jpg",
    },
    {
      city: "Vancouver, Canada",
      image:
        "https://uceap.universityofcalifornia.edu/sites/default/files/marketing-images/life-in-city-images/vancouver-canada-glance.jpg",
    },
    {
      city: "Buenos Aires, Argentina",
      image:
        "http://www.ineteconomics.org/uploads/featured/buenos-aires-2437858_1280.jpg",
    },
    {
      city: "Agra, India",
      image:
        "https://as1.ftcdn.net/v2/jpg/01/68/89/02/1000_F_168890244_UMc0ZyABwiYdAKIbMqHJS8bPRWlCQ3Sk.jpg",
    },
    {
      city: "Amsterdam, Netherlands",
      image:
        "https://skift.com/wp-content/uploads/2012/11/7329055016_2c9240753d_b.jpg",
    },
    {
      city: "Madrid, Spain",
      image:
        "https://uceap.universityofcalifornia.edu/sites/default/files/marketing-images/life-in-city-images/madrid-spain-glance.jpg",
    },
    {
      city: "Vienna, Austria",
      image:
        "https://images.suitcasemag.com/wp-content/uploads/2023/10/10155359/city-guide-vienna-austria_6534f68834e3e.jpeg",
    },
    {
      city: "Mykonos, Greece",
      image:
        "https://www.seacloud.com/wp-content/uploads/2021/07/SeaCloud_Kreuzfahrten_Griechenland_Kykladen_Mykonos-1-660x928.jpg",
    },
    {
      city: "Sydney, Australia",
      image:
        "https://freerangestock.com/sample/1689/sydney-australia-city-view.jpg",
    },
    {
      city: "Queenstown, New Zealand",
      image:
        "https://images.skypicker.com/?image=https%3A%2F%2Fimages.kiwi.com%2Fphotos%2Foriginals%2Fauckland_nz.jpg&width=992&height=600&quality=80&fit=crop&format=original",
    },
    {
      city: "New Zealand",
      image:
        "https://kaurimmigration.com/wp-content/uploads/2023/03/photo-1600208669687-f19af3638cb9.jpg",
    },
    {
      city: "Cancun, Mexico",
      image: "https://blog.architizer.com/wp-content/uploads/f2-2-1024x676.jpg",
    },
    {
      city: "Krakow, Poland",
      image:
        "https://thumbs.dreamstime.com/b/night-city-images-krakow-poland-august-267939485.jpg",
    },
    {
      city: "Delhi, India",
      image:
        "https://uceap.universityofcalifornia.edu/sites/default/files/marketing-images/life-in-city-images/new-delhi-india-glance.jpg",
    },
    {
      city: "Melbourne, Australia",
      image:
        "https://www.openapis.org/wp-content/uploads/sites/3/2023/09/melbourne-1000x562-1.jpg",
    },
    {
      city: "Florence, Italy",
      image:
        "https://businesstravelerusa.com/wp-content/uploads/2023/10/Florence-Italy_Credit_Giuseppe-Mundy_Unsplash.jpg",
    },
    {
      city: "Bruges, Belgium",
      image:
        "https://media.licdn.com/dms/image/v2/D4E22AQFHHuSmQitUKA/feedshare-shrink_800/feedshare-shrink_800/0/1733504428884?e=2147483647&v=beta&t=seXSVoyXXbAoVUnvCN0VIhxW0s_YkxCrcO6NqmM-Xa0",
    },
    {
      city: "Chichen Itza, Mexico",
      image:
        "https://uceap.universityofcalifornia.edu/sites/default/files/marketing-images/life-in-city-images/yucatan-glance_0.jpg",
    },
    {
      city: "Marrakech, Morocco",
      image:
        "https://media.istockphoto.com/id/470267140/photo/orange-juice-vendor.jpg?s=1024x1024&w=is&k=20&c=Dk9aqmXiDJpFIeSVn5mltBUjLBZqn0BppeGcfUIVGE4=",
    },
    {
      city: "Rome, Italy",
      image:
        "https://uceap.universityofcalifornia.edu/sites/default/files/marketing-images/life-in-city-images/rome-italy-glance.jpg",
    },
    {
      city: "Petra, Jordan",
      image:
        "https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=2995954537614205220",
    },
    {
      city: "Maldives",
      image:
        "https://media.assettype.com/outlooktraveller%2Fimport%2Foutlooktraveller%2Fpublic%2Fuploads%2Farticles%2Fexplore%2F2016%2F07%2Ffeatured.jpg",
    },
    {
      city: "San Francisco, USA",
      image:
        "https://m.media-amazon.com/images/I/61uJ59LWnqL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      city: "Santorini, Greece",
      image:
        "https://i.pinimg.com/736x/b0/6f/ba/b06fba80f18234fa34f7dd2df9e7ea84.jpg",
    },
    {
      city: "Bangkok, Thailand",
      image:
        "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/67/2023/08/16042833/The-BEST-Bangkok-Tours-and-Things-to-Do_result.jpg",
    },
    {
      city: "Phuket, Thailand",
      image:
        "https://theworldtravelguy.com/wp-content/uploads/2022/09/DJI_0104-2.jpg",
    },
    {
      city: "Hawaii, USA",
      image:
        "https://m.media-amazon.com/images/I/51r1vsOLWqL._UF1000,1000_QL80_.jpg",
    },
    {
      city: "Ibiza, Spain",
      image:
        "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=752613205105035",
    },
    {
      city: "Chicago, USA",
      image:
        "https://m.media-amazon.com/images/I/61eUVP7l49L._AC_UF1000,1000_QL80_.jpg",
    },
    {
      city: "Machu Picchu, Peru",
      image:
        "https://media.istockphoto.com/id/1438439302/photo/machu-picchu-is-a-15th-century-inca-citadel-located-in-the-eastern-cordillera-of-southern-peru.jpg?s=1024x1024&w=is&k=20&c=w9Veffo__7MjF4zfBHQOLTIancZ3hWEgWHq5zB4AxMg=",
    },
    {
      city: "Barcelona, Spain",
      image:
        "https://images.squarespace-cdn.com/content/v1/5f8f6fabe23fdd71ddab36b8/837d1851-65f8-42e5-9321-37cd9f93d3b0/entry_156_contents_2449_big.jpg",
    },
    {
      city: "Cape Town, South Africa",
      image:
        "https://uceap.universityofcalifornia.edu/sites/default/files/marketing-images/life-in-city-images/cape-town-south-africa-glance.jpg",
    },
    {
      city: "Interlaken, Switzerland",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/6004_-_Meiringen_-_Bahnhofstrasse.JPG/800px-6004_-_Meiringen_-_Bahnhofstrasse.JPG?20080406194752",
    },
    {
      city: "Kyoto, Japan",
      image:
        "https://www.air-golf.com/sites/default/files/article/images/kyoto%20head%20photo.jpg",
    },
    {
      city: "London, UK",
      image:
        "https://julietmckeephotography.co.uk/wp-content/uploads/2017/03/31-42404-post/London-Mayfair-samesex-engagement-shoot-5.jpg",
    },
    {
      city: "Paris, France",
      image:
        "https://cdn.pixabay.com/photo/2015/08/10/13/51/paris-882702_960_720.jpg",
    },
    {
      city: "Bora Bora, French Polynesia",
      image:
        "https://images.skypicker.com/?image=https%3A%2F%2Fimages.kiwi.com%2Fphotos%2Foriginals%2Fauckland_nz.jpg&width=992&height=600&quality=80&fit=crop&format=original",
    },
    {
      city: "New York City, USA",
      image:
        "https://m.media-amazon.com/images/I/61u94fTH-yL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      city: "Toronto, Canada",
      image:
        "https://alpha.creativecirclecdn.com/environment/original/20240617-180753-3f3-toronto-city-in-the-daytime.jpg",
    },
    {
      city: "Seville, Spain",
      image: "https://live.staticflickr.com/7341/14077285262_646f353af2_b.jpg",
    },
    {
      city: "Seoul, South Korea",
      image:
        "https://png.pngtree.com/thumb_back/fw800/background/20230925/pngtree-the-city-of-seoul-in-south-korea-panorama-city-view-image_13125055.png",
    },
    {
      city: "Tokyo, Japan",
      image:
        "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/japan-tokyo-2-unique-drawing.jpg",
    },
    {
      city: "Athens, Greece",
      image:
        "https://www.greeknewsagenda.gr/wp-content/uploads/sites/2/2022/06/Athens-Urban-Age-Forum-promo-747x420.jpg",
    },
    {
      city: "Dublin, Ireland",
      image:
        "https://sydabroad.com/wp-content/uploads/2022/04/ireland-city-images-683x1024.jpg",
    },
  ];

  const handleDatePickerChange = (date) => {
    console.log("date updated");
    const start = new Date(
      date.start.year,
      date.start.month - 1,
      date.start.day,
    );
    const end = new Date(date.end.year, date.end.month - 1, date.end.day);

    const oneDay = 1000 * 60 * 60 * 24; // milliseconds in a day
    const diffInTime = Math.abs(end.getTime() - start.getTime());
    const days = Math.round(diffInTime / oneDay) + 1;

    setPlanData({
      ...planData,
      duration: days,
      startDate: start.toLocaleDateString("en-CA"),
      endDate: end.toLocaleDateString("en-CA"),
    });
  };

  const { data, loading, error, fetchData } = axiosFetch();

  const getImages = async (destination) => {
    await fetchData({
      url: `${TRIPS_URL}/getGooglePlaces/${destination} skyline`,
      method: "GET",
      token: localStorage.getItem("token"),
    });
    setDestinationEntered(true);
  };

  useEffect(() => {
    if (!loading && !error && data) {
      console.log(data.data.imageUrls[0]);
      setPlanData({ ...planData, thumbnail: data.data.imageUrls[0] });
    }
  }, [data, loading, error]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        width: "fit-content",
        gap: "15px",
        height: "80%",
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        textAlign="center"
        marginBottom={2}
      >
        Stage 1
      </Typography>
      <Autocomplete
        onInputChange={(e, value) => {
          setPlanData({ ...planData, destination: value });
          if (destinations.find((dest) => dest.city === value)) {
            // getImages(value);
            setPlanData({
              ...planData,
              thumbnail: destinations.find((dest) => dest.city === value).image,
            });
            console.log("destination entered");
          }
        }}
        value={planData.destination}
        disablePortal
        id="combo-box-demo"
        options={destinations.map((option) => option.city)}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Destination" />}
      />
      <DateRangePicker
        calendarProps={{
          classNames: {
            base: "bg-slate-300",
            pickerWrapper: "bg-slate-300",
            cellButton: [
              "data-[today=true]:bg-default-100 data-[selected=true]:bg-transparent rounded-small",
              // start (pseudo)
              "data-[range-start=true]:before:rounded-l-small",
              "data-[selection-start=true]:before:rounded-l-small",
              // end (pseudo)
              "data-[range-end=true]:before:rounded-r-small",
              "data-[selection-end=true]:before:rounded-r-small",
              // start (selected)
              "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:rounded-small",
              "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:bg-orange-500",
              // end (selected)
              "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:rounded-small",
              "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:bg-orange-500",
            ],
          },
        }}
        onChange={handleDatePickerChange}
        // className={`bg-${"slate"}-50`}
        isRequired
        minValue={today(getLocalTimeZone())}
        label="Trip Duration"
      />

      <TextField
        id="outlined-basic"
        label="Budget"
        variant="outlined"
        type="number"
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          setPlanData({ ...planData, budget: value });
        }}
        slotProps={{ input: { min: 0 } }}
      />
    </Box>
  );
};

export default Stage1;
