var currentdate = new Date();

if (currentdate.getHours() < 10) {
    var current_hours = "0" + currentdate.getHours();
} else {
    var current_hours = currentdate.getHours();
}
var now = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + "T" + current_hours + ":00";

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

function get_code_translation(code) {
    if (code == 0) {
        return "Ясно"
    } else if (code == 1) {
        return "В основном ясно"
    } else if (code == 2) {
        return "Переменная облачность"
    } else if (code == 3) {
        return "Пасмурно"
    } else if (code == 45) {
        return "Туман"
    } else if (code == 48) {
        return "Туман"
    } else if (code == 51) {
        return "Лёгкая морось"
    } else if (code == 53) {
        return "Морось"
    } else if (code == 55) {
        return "Сильная морось"
    } else if (code == 56) {
        return "Лёгкая изморось"
    } else if (code == 57) {
        return "Изморось"
    } else if (code == 61) {
        return "Лёгкий дождь"
    } else if (code == 63) {
        return "Дождь"
    } else if (code == 65) {
        return "Сильный дождь"
    } else if (code == 66) {
        return "Слабый ледяной дождь"
    } else if (code == 67) {
        return "Ледяной дождь"
    } else if (code == 71) {
        return "Лёгкий снег"
    } else if (code == 73) {
        return "Снег"
    } else if (code == 75) {
        return "Сильный снег"
    } else if (code == 77) {
        return "Град"
    } else if (code == 80) {
        return "Лёгкий ливень"
    } else if (code == 81) {
        return "Ливень"
    } else if (code == 82) {
        return "Сильный ливень"
    } else if (code == 85) {
        return "Снегопад"
    } else if (code == 86) {
        return "Сильный снегопад"
    } else {
        return "unknown"
    }
}

let poses_long = [37.57374756034067, 37.35371597655033, 37.45790538694327, 37.66776181890536, 37.611629120379995, 37.39046497191754, 37.467474869839684, 37.44516359100243, 37.26216328462547, 37.58450207066965, 37.7183221732893, 37.87059696864372, 37.615839775147734, 37.85283045136892, 37.80547292788867];
let poses_lat = [55.869939609754574, 55.84377858309461, 55.75130468793709, 55.79937092421346, 55.74962124064524, 55.699998851502, 55.79600322062918, 55.63017677541132, 55.59653354420388, 55.58717409012173, 55.613828984676445, 55.695114497877675, 55.68060369541575, 55.75802587680279, 55.859902734072634];
let percent_x = [150, 30, 75, 180, 150, 40, 70, 80, 20, 100, 190, 220, 120, 210, 230];
let percent_y = [100, 120, 180, 150, 200, 220, 150, 270, 300, 330, 300, 250, 250, 180, 120];

let parent_div = document.getElementById("precipitationparent")

async function upd_weather_codes(){
    for (let i = 0; i < poses_long.length; i++) {
        let url = `https://api.open-meteo.com/v1/forecast?latitude=${poses_lat[i]}&longitude=${poses_long[i]}&hourly=weathercode,temperature_2m&daily=temperature_2m_max,temperature_2m_min,windspeed_10m_max&timezone=Europe%2FMoscow&start_date=2022-12-01&end_date=2022-12-26`;
        let response = await fetch(url);
        let data = await response.json();
        // let data = res.data
        // Вывод температуры
        var times = data.hourly.time;
        var temperature = data.hourly.temperature_2m;
        let c = 0;
        while (times[c] != now) {
            c++;
        }
        let weathercode = data.hourly.weathercode[c];
        let span = document.createElement("span")
        span.textContent = get_code_translation(weathercode);
        span.style.backgroundColor = get_color_for_degrees(temperature[c]);
        span.style.position = "absolute";
        span.style.left = percent_x[i] + "px";
        span.style.top = percent_y[i] + "px";
        span.style.fontSize = "12px";
    
        span.style.opacity = 0.5;
        parent_div.appendChild(span);
    }
}
upd_weather_codes();