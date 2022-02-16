function display_c() {
    var refresh = 1000; // Refresh rate in milli seconds
    mytime = setTimeout('display_ct()', refresh)
}

function display_ct() {
    var date = new Date()
    document.getElementById('ct').innerHTML = dateToddmmyyyy(date);
    display_c();
}

function dateToddmmyyyy(date) {
    document.getElementById('ct').style.fontSize = '70px';
    document.getElementById('ct').style.fontStyle = 'italic';
    document.getElementById('ct').style.fontFamily = "Times New Roman, Times, serif";

    var d = date.getDate();
    var month = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    return intTo2Digits(d) + '/' + intTo2Digits(month) + '/' + y + ' ' + intTo2Digits(h) + ':' + intTo2Digits(m) + ':' + intTo2Digits(s);
}

function intTo2Digits(val) {
    return (val <= 9 ? '0' + val : val)
}

let weather = {
    "apiKey": "b351858604ee4f8c51b7457dcf255156",
    fetchweather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&lang=fr&appid=" + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { pressure } = data.main;
        document.querySelector(".city").innerText = "La méteo: " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidité: " + humidity + "%";
        document.querySelector(".wind").innerText = "Vitesse du vent: " + speed + " km/h";
        document.querySelector(".pressure").innerText = "Pression atmo: " + pressure + " hpa";
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
        this.fetchweather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchweather("Le Lamentin");

let weather2 = {
    fetchweather: function (data) {
        fetch("https://services1.arcgis.com/y8pKCLYeLI1K2217/arcgis/rest/services/ind_martinique/FeatureServer/0/query?where=code_zone%20%3D%20%2797213%27&outFields=date_ech,code_qual,lib_qual,coul_qual,date_dif,source,type_zone,code_zone,lib_zone&outSR=4326&f=json")
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));;
    },
    displayWeather: function (data) {
        const { name } = data;
        const { lib_qual, coul_qual } = data.features[0].attributes;
        console.log(data.features[0].attributes);
        document.querySelector(".lib_qual").innerText = "Qualité d'air: " + lib_qual + " " + coul_qual;
    },
}

weather2.fetchweather("Le Lamentin");