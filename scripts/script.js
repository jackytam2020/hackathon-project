const locationInput = document.querySelector("#inputLocation");
const form = document.querySelector(".user-input");
let locationArr = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = event.target.inputLocation.value;
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyAjd0SepMQhTXIzQ867kiid-4xt7JjLMKU`;
  const latLong = axios.get(URL);
  latLong.then((response) => {
    locationArr = response.data;
    const coordinates = locationArr.results[0].geometry.location;
    const lat = coordinates.lat;
    const lng = coordinates.lng;
  });
});
