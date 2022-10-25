const wmoCodes = [
  {
    code: [0],
    description: 'Sunny',
  },
  {
    code: [1, 2, 3],
    description: 'overcast',
  },
  {
    code: [45, 48],
    description: 'Fog',
  },
  {
    code: [51, 53, 55],
    description: 'Light Drizzle',
  },
  {
    code: [56, 57],
    description: 'Freezing Drizzle',
  },
  {
    code: [61, 63, 65],
    description: 'Rain',
  },
  {
    code: [66, 67],
    description: 'Freezing Rain',
  },
  {
    code: [71, 73, 75],
    description: 'Snow Fall',
  },
  {
    code: [77],
    description: 'Snow Grains',
  },
  {
    code: [80, 81, 82],
    description: 'Heavy Rain',
  },
  {
    code: [85, 86],
    description: 'Heavy Snow',
  },
  {
    code: [95],
    description: 'Thunderstorm',
  },
  {
    code: [96, 99],
    description: 'Thunderstorm and Heavy Hail',
  },
];

const imgContainer = document.querySelector('.form__img-container');

const getImage = (keyword) => {
  const imagePromise = axios.get(
    `https://api.unsplash.com/photos/random/?client_id=EznpkIFvnj4Gzxg1oi6Vxay3s7lFh5rz8m4EVXKCixg&query=${keyword}`
  );
  imagePromise.then((response) => {
    imgContainer.innerHTML += `
    <img class='form__img' src="${response.data.urls.raw}"/>
    `;
  });
};

let displayWord = '';

const getWeather = (lat, long, date) => {
  const weatherPromise = axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours&current_weather=true&timezone=auto&start_date=${date}&end_date=${date}`
  );

  weatherPromise.then((response) => {
    const weatherCode = response.data.current_weather.weathercode;

    wmoCodes.forEach((item) => {
      if (item.code.includes(weatherCode)) {
        displayWord = item.description;
      }
    });

    getImage(displayWord);
    imgContainer.innerHTML += `
    <p class='temperature'>Temperature is : ${response.data.current_weather.temperature}</p>
    `;
    console.log(response.data.current_weather);
  });
};

//take in user location input
const locationInput = document.querySelector('#inputLocation');
const form = document.querySelector('.form__button');
let locationArr = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = event.target.inputLocation.value;
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyAjd0SepMQhTXIzQ867kiid-4xt7JjLMKU`;
  const latLong = axios.get(URL);
  latLong.then((response) => {
    locationArr = response.data;
    const coordinates = locationArr.results[0].geometry.location;
    const lat = coordinates.lat;
    const lng = coordinates.lng;
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    let currentDate = year + '-' + month + '-' + day;

    getWeather(lat, lng, currentDate);
  });
});
