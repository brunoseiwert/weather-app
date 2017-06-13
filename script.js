var colors = {
    warm: "#71291f",
    medium: "#336c5f",
    cold: "#14385e"
}

var celsius;
var fahrenheit;

$(document).ready(function() {

    if('geolocation' in navigator) {

        navigator.geolocation.getCurrentPosition(function(position) {

            var lat = position.coords.latitude;
            var long = position.coords.longitude;

            var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=752aa7af29871d19c49ed03880e5f812";

            $.getJSON(url, function(json) {

                $("#location").html(json.name + ", " + json.sys.country);

                celsius = Math.floor(json.main.temp - 273.15);
                fahrenheit = Math.floor(celsius * 1.8 + 32);

                $("#temp").html(Math.floor(celsius));

                $("#conditions").html(json.weather[0].description);

                if(json.main.temp - 273.15 > 15) {
                    // warm
                    $("html body").animate({"background-color": colors.warm}, 500);
                } else if(json.main.temp - 273.15 > 0) {
                    // medium
                    $("html body").animate({"background-color": colors.medium}, 500);
                } else {
                    // cold
                    $("html body").animate({"background-color": colors.cold}, 500);
                }

            });

        });

    }

    $("#swap").on("click", function() {
        if($("#swap").html() == "C") {
            $("#swap").html("F");
            $("#temp").html(fahrenheit);
        } else if($("#swap").html() == "F") {
            $("#swap").html("C");
            $("#temp").html(celsius);
        }
    });
});
