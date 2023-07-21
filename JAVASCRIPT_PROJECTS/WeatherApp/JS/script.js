let api_key = "075f5e9d947f936905c15add4213b699";
const text = document.getElementById("city");
const p1 = document.getElementById("p1");
const btn = document.getElementById("btn1");
let img = document.getElementById('img1');
let temp_c = document.getElementById('temp_1');
let temp_f = document.getElementById('temp_2');
let location_1 = document.getElementById('location_1');
let country = document.getElementById('country');
let humidity = document.getElementById('humidity');
let condition = document.getElementById('condition');
let wind_speed = document.getElementById('wind_speed');
let wind_dir = document.getElementById('wind_dir');
let feelslike_c = document.getElementById('feelslike_c');
let description_1 = document.getElementById('description_1');


btn.addEventListener("click", (event) => {
  event.preventDefault();
  let city = String(text.value);
  getWeather(city);
});

async function getWeather(city) {
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c2cc3b1070msha60435e014875fbp1a3244jsn9b310238bd38",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    fetch(url, options)
      .then((response) => response.json())
      .then((response) =>{
        
        location_1.innerHTML= response.location['name'];

        country.innerHTML = response.location['country'];
        // let latitude = response.location['lat'];
        // localtime.innerHTML = response.location['localtime'];
        temp_c.innerHTML = response.current['temp_c'];
        temp_f.innerHTML = response.current['temp_f'];
        let a1 = response.current['condition'];
        // condition.innerHTML = a1['text'];
        img.src = a1['icon'];
        wind_speed.innerHTML = response.current['wind_kph'];
        wind_dir.innerHTML = response.current['wind_dir'];
        humidity.innerHTML = response.current['humidity'];
        feelslike_c.innerHTML = response.current['feelslike_c'];
        
      })
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
}
