# React Weather App 🌤️

### Screenshot
<img src="https://github.com/0hterm/full-stack-weather-app/assets/140545108/caea1b19-4ff8-4650-840a-8326c9995749" alt="image" />

### What's the App?
This web-app will display an 8-hour forecast specific to the user's location. If the user's current local time is past 16:00 (4:00 PM), the user will instead see a forecast spread from 16:00 to 23:00. This limitation is implemented by weatherAPI.

### How does it work?
When the user loads the page, their location is found by IP and returned as longitude and latitude values. These values are plugged into the weather api which then returns extensive information regarding local weather in the form of JSON data. This JSON data is then used in development.



