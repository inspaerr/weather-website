function get_daily_forecast(day) {
    if (day < 10) {
        query_day = "0" + day;
    } else {
        query_day = day;
    }
}
let url = `https://api.open-meteo.com/v1/forecast?latitude=55.75&longitude=37.62&daily=temperature_2m_max,temperature_2m_min,windspeed_10m_max&timezone=Europe%2FMoscow&start_date=2022-12-${day}&end_date=2022-12-${day}`;

async function update_daily_weather() {
    let response = await fetch(url);
    let data = await response.json();
    // Вывод температуры
    // console.log(data);
    let max_temp = data.daily.temperature_2m_max[0];
    let min_temp = data.daily.temperature_2m_min[0];
    let wind_speed = data.daily.windspeed_10m_max[0];
    let max_apparent_temp = data.daily.apparent_temperature_2m_max[0];
    let min_apparent_temp = data.daily.apparent_temperature_2m_min[0];
    document.getElementById("exact_day").innerText = day;
    document.getElementById("exact_max_degrees").innerText = max_temp;
    document.getElementById("exact_apparent_max_degrees").innerText = max_apparent_temp;
    document.getElementById("exact_min_degrees").innerText = min_temp;
    document.getElementById("exact_apparent_mix_degrees").innerText = min_apparent_temp;
    document.getElementById("exact_wind_speed").innerText = wind_speed;
}
update_daily_weather();