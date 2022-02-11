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
    document.getElementById('ct').style.fontSize = '50px';
    document.getElementById('ct').style.justifyContent = 'center';
    document.getElementById('ct').style.fontFamily = "Impact,Charcoal,sans-serif";

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
    "apiKey": "b351858604ee4f8c51b7457dcf255156"
    fetchweather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey).then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed)
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    }
};