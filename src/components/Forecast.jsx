import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';



const Forecast = () => {

    const [ip, setIp] = useState("");
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    let forecast = [];
    let currTime = new Date().toTimeString();

    useEffect(() => {
        const getIp = async () => {
            const res = await axios.get("https://api.ipify.org/?format=json");
            if (res.data.ip) {
                setIp(res.data.ip);
            }   
        };
        getIp();
        const getLocation = async (ip) => {
            const res = await axios.get(`http://www.geoplugin.net/json.gp?ip=${ip}`);
            if (res.data.geoplugin_status == 200) {
                setLat(res.data.geoplugin_latitude);
                setLong(res.data.geoplugin_longitude);
            }
        }
        getLocation(ip);
        const callAPI = async (lat, long) => {
            const base_url = "http://api.weatherapi.com/v1/forecast.json";
            const token = "e2dd6a4c29d6401fb8a34747240603";
            const full_url = `${base_url}?key=${token}&q=${lat},${long}`;

            const res = await axios.get(full_url);
            const json = await res.data;


            for (const forecastday of json.forecast.forecastday) {
                for (const weather of forecastday.hour) {
                    const time = weather.time;
                    const tempC = weather.temp_c;
                    const tempF = weather.temp_f;
                    const condition = [weather.condition.text, weather.condition.icon];
                    const wind_speed = weather.wind_mph;
                    const wind_dir = weather.wind_dir;
                    const will_rain = weather.will_it_rain;

                    const data = {
                        "time": time,
                        "tempC": tempC,
                        "tempF": tempF,
                        "condition": condition,
                        "wind_speed": wind_speed,
                        "wind_dir": wind_dir,
                        "will_rain": will_rain
                    }
                    forecast.push(data);
                }
            }
        }
        callAPI(lat, long);

        const getHour = () => {
            let hour = parseInt(currTime.split(":")[0]);
            return hour;
        }
        const hour = getHour();
    
        const getTimeSpread = (hour) => {
            let spread = [];
            if (hour > 16) {
                let diff = Math.abs(24 - (hour+8));
                hour -= diff;         
            }
            for (let i = hour; i < hour+8; i++) {
                spread.push(i);
            }
            return spread;
        }
        const spread = getTimeSpread(hour);
        console.log(hour);
        console.log(spread);
    
        const spread_data = [];
        const getForecast = (forecast,spread) => {
            for (const data of forecast) {
                console.log(data);
                if (data.time[11] + data.time[12] in spread) {
                    spread_data.push(data);
                }
            }
        }
        getForecast(forecast,spread);
        console.log(spread_data);
    });

    
    
    return (
        <div className="Forecast">
            
        </div>
    )
    
};

export default Forecast;
