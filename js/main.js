document.addEventListener("DOMContentLoaded", init);

function init() {
  let url = `http://api.weatherbit.io/v2.0/current?key=b3090c4d10124a92bc72bc826a815035&lat=45.35&lon=-75.75`;

  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);

      let dateTime = document.getElementById("Datetime");

      dateTime.innerHTML = data.data[0].ob_time;

      let temperature = document.getElementById("temperature");
      temperature.innerHTML = data.data[0].app_temp;

      let city = document.getElementById("city");
      city.innerHTML = data.data[0].city_name;

      let weatherDes = document.getElementById("WeatherDes");
      weatherDes.innerHTML = data.data[0].weather.description;
    })
    .catch(err => {
      console.log(err.message);
    });
}
