let url = `https://api.open-meteo.com/v1/forecast?latitude=55.75&longitude=37.62&daily=apparent_temperature_max,apparent_temperature_min,temperature_2m_max,temperature_2m_min,windspeed_10m_max&timezone=Europe%2FMoscow&start_date=2022-12-01&end_date=2022-12-26`;

function get_color_for_degrees(_degrees) {
    if (_degrees > 0) {
        return "#FF007F";
    } else if (_degrees > -3) {
        return "#00FFFF";
    } else if (_degrees > -5) {
        return "#66ccff";
    } else if (_degrees > -8) {
        return "#3333ff";
    } else {
        return "#000066";
    }
}

async function upd_weather_codes(){
    let response = await fetch(url);
    let data = await response.json();
    // Вывод температуры
    // console.log(data);
    let max_temp = data.daily.temperature_2m_max;
    let min_temp = data.daily.temperature_2m_min;
    let wind_speed = data.daily.windspeed_10m_max;

    window.max_temp = max_temp;
    window.min_temp = min_temp;
    window.wind_speed = wind_speed;
    window.apparent_max = data.daily.apparent_temperature_max;
    window.apparent_min = data.daily.apparent_temperature_min;
    window.wind_speed = wind_speed;

    for (let i = 0; i < max_temp.length; i++) {
        let max_color = get_color_for_degrees(max_temp[i]);
        let weather_day_cell = document.getElementById("weather-day-" + (i + 1));
        weather_day_cell.style.borderColor = max_color;
        document.getElementById("weather-degrees-" + (i + 1)).innerText = Math.round(max_temp[i]) + "°C";
        document.getElementById("weather-degrees-min-" + (i + 1)).innerText = Math.round(min_temp[i]) + "°C";
        document.getElementById("weather-windspeed-" + (i + 1)).innerText = Math.round(wind_speed[i]) + " м/с";
    }
}
upd_weather_codes();