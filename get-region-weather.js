const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
let longitude = params.longitude;
let latitude = params.latitude;
let region = params.region;

var currentdate = new Date();

if (currentdate.getHours() < 10) {
    var current_hours = "0" + currentdate.getHours();
} else {
    var current_hours = currentdate.getHours();
}
var now = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + "T" + current_hours + ":00"

let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,windspeed_10m_max&timezone=Europe%2FMoscow`;

function get_region_name(name) {
    if (name == "central") {
        return "Центральный Автономный Округ";
    } else if (name == "north") {
        return "Северный Автономный округ";
    } else if (name == "south") {
        return "Южный Автономный округ";
    } else if (name == "west") {
        return "Западный Автономный округ";
    } else if (name == "south") {
        return "Южный Автономный Округ";
    } else if (name == "east") {
        return "Восточный Автономный округ";
    } else {
        return "Не найдено";
    }
}

async function update_region_weather() {
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
    document.getElementById("region_name").innerText = get_region_name(region);
    document.getElementById("region_degrees").innerText = temperature_2m[c] + "°C";
    document.getElementById("region_apparent_degrees").innerText = apparent_temperature[c] + "°C";
    document.getElementById("region_wind_speed").innerText = windspeed_10m[c] + " м/с";
    document.getElementById("region_hidranity").innerText = relativehumidity_2m[c] + "%";
}
update_region_weather();