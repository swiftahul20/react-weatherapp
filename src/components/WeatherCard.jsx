import React, {useLayoutEffect, useState } from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Input, Button, Tooltip, Typography } from "@material-tailwind/react";

import CloudyIcon from '../assets/icons/cloudy.png'
import DrizzleIcon from '../assets/icons/drizzle.png'
import FullCloudyIcon from '../assets/icons/full_cloudy.png'
import MistIcon from '../assets/icons/mist.png'
import SnowyIcon from '../assets/icons/snowy.png'
import StormIcon from '../assets/icons/storm.png'
import SunnyIcon from '../assets/icons/sunny.png'
import RainIcon from '../assets/icons/rain.png'

import BgImage01 from '../assets/image/sky.jpg'

const WeatherCard = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [cityData, setCityData] = useState({});
    const [weather, setweather] = useState([]);
    const [countryName, setcountryName] = useState('')
    const [loading, setloading] = useState(false)
    const [icon, setIcon] = useState([])

    const [location, setLocation] = useState(null);
    const [windDegree, setWindDegree] = useState(null);

    const api_key = process.env.REACT_APP_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=Metric&appid=${api_key}`

    const fetchCityData = async () => {
        if (searchQuery !== "") {
            setloading(true);
            try {
                const res = await axios(url)
                setTimeout(() => {
                    setCityData(res.data);
                    getWeather(res);
                    setloading(false);
                    getCountryName(res);
                    setIcon(res.data.weather)
                    // textToIcon(res.data.wind.deg);
                    setWindDegree(res.data.wind.deg);
                }, 1500);
            } catch (error) {
                console.log(error);
                if (error.response.status === 404) {
                    errorNotify();
                    setloading(false);
                }
            }
        } else {
            blankNotify();
        }
    }

    const fetchLatLon = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }
    }

    const success = async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude })
        try {
            const res = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`)
            setCityData(res.data);
            getCountryName(res);
            getWeather(res);
            setWindDegree(res.data.wind.deg);
        } catch (error) {
            console.log(error);
        }
    }

    function error() {
        locationNotify();
    }

    const getCountryName = (res) => {
        const countryName = new Intl.DisplayNames(['en'], { type: 'region' });
        setcountryName(countryName.of(res.data.sys.country));
    }

    const getWeather = (res) => {
        setweather(res.data.weather)
    }

    useLayoutEffect(() => {
        fetchLatLon();
    }, [])



    let weatherIcon;
    icon.map((data) => {
        const cuaca = data.main;
        switch (cuaca) {
            case "Thunderstorm":
                weatherIcon = <img src={StormIcon} alt="Storm" className='h-40 w-40'></img>;
                break;
            case "Drizzle":
                weatherIcon = <img src={DrizzleIcon} alt="Drizzle" className='h-40 w-40'></img>;
                break;
            case "Rain":
                weatherIcon = <img src={RainIcon} alt="Rain" className='h-40 w-40'></img>;
                break;
            case "Clear":
                weatherIcon = <img src={SunnyIcon} alt="Sunny" className='h-40 w-40'></img>;
                break;
            case "Mist":
                weatherIcon = <img src={MistIcon} alt="Mist" className='h-40 w-40'></img>;
                break;
            case "Snow":
                weatherIcon = <img src={SnowyIcon} alt="Snow" className='h-40 w-40'></img>;
                break;
            case "Clouds":
                weatherIcon = <img src={FullCloudyIcon} alt="Clouds" className='h-40 w-40'></img>;
                break;
            default:
                weatherIcon = <img src={CloudyIcon} alt="Sunny" className='h-40 w-40'></img>;
        }
    })

    function getWindDirection(degrees) {
        const direction = Math.floor((degrees + 22.5) / 45) % 8;
        switch (direction) {
            case 0:
                return 'North';
            case 1:
                return 'North-East';
            case 2:
                return 'East';
            case 3:
                return 'South-East';
            case 4:
                return 'South';
            case 5:
                return 'South-West';
            case 6:
                return 'West';
            case 7:
                return 'North-West';
            default:
                return 'Unknown';
        }
    }

    const errorNotify = () => toast("City not found!");
    const blankNotify = () => toast("City must be filled!");
    const locationNotify = () => toast("Cannot get your current location");


    return (
        <div className="flex justify-center items-center h-screen bg-cover"
            style={{ backgroundImage: `url(${BgImage01})` }}>
            <div className="backdrop-blur-lg bg-white/30 p-4 rounded-lg shadow-md min-h-[400px] w-[400px]">
                <div className='flex items-start px-2 gap-2'>

                    <Input
                        type="text"
                        name="search"
                        className="text-sm bg-transparent"
                        variant="standard"
                        label="Type any City name"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        containerProps={{
                            className: "min-w-0",
                        }}
                    />
                    <Button
                        size="sm"
                        variant='text'
                        className="!absolute right-4 top-5 rounded-full"
                        onClick={fetchCityData}
                    >
                        {
                            !loading ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                                :
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                        }
                    </Button>
                </div>
                <div className='mt-6 px-2'>
                    <h2 className="text-3xl my-4">
                        {
                            Object.keys(cityData).length > 0 ? (
                                <span>
                                    {
                                        countryName ? `${cityData.name}, ${countryName}` : cityData.name
                                    }
                                </span>
                            ) : "--"
                        }
                    </h2>
                    <div className="flex">
                        {
                            icon.length > 0 ? (
                                <> {weatherIcon} </>
                            ) : <img src={CloudyIcon} alt="Sunny" className='h-40 w-40'></img>
                        }
                        <div className='flex items-center'>
                            <div className="flex-auto w-44 text-center mx-auto">
                                {
                                    Object.keys(cityData).length > 0 ? (
                                        <div className='text-4xl '>
                                            {
                                                typeof cityData.main.temp === 'number' ? cityData.main.temp.toFixed(0) : cityData.main.temp
                                            }
                                            °C
                                        </div>
                                    ) : <div className='text-3xl '> -- °C </div>
                                }
                                <div className='text-xl my-2 '>
                                    {
                                        weather?.map((data, i) => {
                                            return (
                                                <div key={i}> {data.main} </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='flex items-start'>
                            <Tooltip
                                className="backdrop-blur-lg bg-black/70 px-4 py-2 shadow-xl"
                                placement="right"
                                content={
                                    <div className="w-50">
                                        <Typography color="white" className="mb-2">
                                            Details
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="white"
                                            className="font-normal"
                                        >
                                            {
                                                Object.keys(cityData).length > 0 ? (
                                                    <div className='grid grid-rows-4 gap-2 text-gray-300'>
                                                        <div> Description:
                                                            <span className='block text-gray-400'>
                                                                {
                                                                    weather?.map((data, i) => {
                                                                        return (
                                                                            <div key={i}> {data.description} </div>
                                                                        )
                                                                    })
                                                                }
                                                            </span>
                                                        </div>
                                                        <div> Coordinate: <span className='block text-gray-400'> Lat: {cityData.coord.lat} {''} Lon: {cityData.coord.lon} </span> </div>
                                                        <div> Visibility: <span className='block text-gray-400'> {cityData.visibility / 1000} Km </span> </div>
                                                        <div> Wind direction:
                                                            <span className='block text-gray-400'>
                                                                {windDegree !== null ? (
                                                                    <>
                                                                        {getWindDirection(windDegree)} ({windDegree}°)
                                                                    </>
                                                                ) : (
                                                                    <> - </>
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ) : <div className='grid grid-rows-4 gap-2 text-gray-300'>
                                                    <div> Description: <span> - </span> </div>
                                                    <div> Coordinate: <span> - </span> </div>
                                                    <div> Visibility: <span> - </span> </div>
                                                    <div> Wind direction: <span> - </span> </div>
                                                </div>
                                            }
                                        </Typography>
                                    </div>
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    className="h-5 w-5 cursor-pointer text-blue-gray-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                    />
                                </svg>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 mt-4 gap-2'>
                        <p className="text-md"> Humidity
                            {
                                Object.keys(cityData).length > 0 ? (
                                    <span className='block text-3xl'>
                                        {
                                            typeof cityData.main.humidity === 'number' ? cityData.main.humidity : cityData.main.humidity
                                        }
                                        <span className='text-sm'> % </span>
                                    </span>
                                ) : <span className='block text-3xl'> -- % </span>
                            }
                        </p>
                        <p className="text-md"> Wind Speed
                            {
                                Object.keys(cityData).length > 0 ? (
                                    <span className='block text-3xl'>
                                        {
                                            typeof cityData.wind.speed === 'number' ? cityData.wind.speed : cityData.wind.speed
                                        }
                                        <span className='text-sm'> km/h </span>
                                    </span>
                                ) : <span className='block text-3xl'> -- km/h </span>
                            }
                        </p>
                    </div>
                </div>
                <div className='mt-4 text-center text-[10px]'> 
                    <a className=' hover:text-[#d98457]' href='https://openweathermap.org/api'> OpenWeather </a> and <a className='hover:text-[#28ea95]' href='https://www.flaticon.com/authors/iconixar'> Iconixar </a> 
                </div>
            </div>
        </div>
    )
}

export default WeatherCard