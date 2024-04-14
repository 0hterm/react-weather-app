import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';



const Forecast = () => {

    const [spreadData, setSpreadData] = useState([]);
    const [forecast, setForecast] = useState([]);
    let currTime = new Date().toTimeString();

    const getHour = () => {
        let hour = parseInt(currTime.split(":")[0]);
        return hour;
    }
    const hour = getHour();

    const getIp = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        if (res.data.ip) {
            return res.data.ip;
        }   
    };

    const getLocation = async (ip) => {
        const res = await axios.get(`https://ipapi.co/${ip}/json/`);
        if (res.data) {
            return { lat: res.data.latitude, long: res.data.longitude };
        }
    }

    const callAPI = async (lat, long) => {
        const base_url = "https://api.weatherapi.com/v1/forecast.json";
        const token = "db71452394394660a37180212241204";
        const full_url = `${base_url}?key=${token}&q=${lat},${long}`;

        const res = await axios.get(full_url);
        const json = await res.data;
        const new_forecast = [];


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
                new_forecast.push(data);
            }
        }
        setForecast(new_forecast);
        const spread = getTimeSpread(hour);
        getForecast(new_forecast,spread);
    }

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

    const getForecast = (forecast,spread) => {
        const new_spread_data = [];
        for (const data of forecast) {
            if (spread.includes(parseInt(data.time.slice(11,13)))) {
                new_spread_data.push(data);
            }
        }
        setSpreadData(new_spread_data);
    }


    useEffect(() => {
        const fetchData = async () => {
            const ip = await getIp();
            const location = await getLocation(ip);
            await callAPI(location.lat, location.long);
        }
        fetchData();
    }, []);

    
    
    return (
        <div className="Forecast">
            {spreadData.map((data, index) => {
                return <Card key={index} data={data} />
            })}
        </div>
    )
    
};

export default Forecast;
