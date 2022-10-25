const weatherPromise = axios.get(
  'https://api.open-meteo.com/v1/forecast?latitude=49.16&longitude=-123.18&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours&current_weather=true&timezone=auto&start_date=2022-10-25&end_date=2022-10-25'
);

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

let displayWord = '';

weatherPromise.then((response) => {
  const weatherCode = response.data.current_weather.weathercode;
  console.log(weatherCode);

  wmoCodes.forEach((item) => {
    if (item.code.includes(weatherCode)) {
      displayWord = item.description;
    }
  });

  console.log(displayWord);
});
