var currentdate = new Date();

if (currentdate.getHours() < 10) {
    var current_hours = "0" + currentdate.getHours();
} else {
    var current_hours = currentdate.getHours();
}
var now = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + "T" + current_hours + ":00"

let url = "https://api.open-meteo.com/v1/forecast?latitude=55.75&longitude=37.62&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,windspeed_10m_max&timezone=Europe%2FMoscow";

async function update_weather_today() {
    let response = await fetch(url);
    let data = await response.json();
    // Вывод температуры
    // console.log(data);
    var times = data.hourly.time
    var apparent_temperature = data.hourly.apparent_temperature
    var temperature_2m = data.hourly.temperature_2m
    var windspeed_10m = data.hourly.windspeed_10m
    var relativehumidity_2m = data.hourly.relativehumidity_2m
    let c = 0;
    while (times[c] != now) {
        c++;
    }
    document.getElementById("exact_degrees").innerText = temperature_2m[c] + "°C";
    document.getElementById("exact_apparent_degrees").innerText = apparent_temperature[c] + "°C";
    document.getElementById("exact_wind_speed").innerText = windspeed_10m[c] + " м/с ";
    document.getElementById("exact_hidranity").innerText = relativehumidity_2m[c] + "%";
}

update_weather_today();