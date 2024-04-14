import { useState, useEffect } from 'react';
import axios from 'axios';

const LocationFinder = () => {
    const [ip, setIp] = useState("");
    const [state, setState] = useState("");
    const [region, setRegion] = useState("");
    
    useEffect(() => {
        const getIp = async () => {
            const res = await axios.get("https://api.ipify.org/?format=json");
            if (res.data.ip) {
                setIp(res.data.ip);
            } else {
                return(
                    <div className='LocationFinder'>
                        <p>Cannot find your location. Enter your zip code below.</p>
                        <input type="text" id='text-field'/>
                    </div>
                   )
            }
            
        };
        getIp();

        const getLocation = async (ip) => {
            const res = await axios.get(`https://ipapi.co/${ip}/json/`);
            console.log(res);
            if (res.data) {
                setState(res.data.city);
                setRegion(res.data.region);
            } else {
                return (
                    <div className='LocationFinder'>
                        <p>Error getting location. Please enter your state and region below.</p>
                        <div className='inputs'>
                            <div className='input-field'>
                                <h4>State:</h4>
                                <input type="text" id="state-input" placeholder='Enter the state you live in.'/>
                            </div>
                            <div className='input-field'>
                                <h4>Region:</h4>
                                <input type="text" id="state-input" placeholder='Enter the state you live in.'/>
                            </div>
                        </div>
                    </div>
                )
            }

        }
        getLocation(ip);
    }, []);
    
    return (
        <div className='LocationFinder'>
            <p>Location: {state}, {region}</p>
        </div>
    )
    
   
}

export default LocationFinder;