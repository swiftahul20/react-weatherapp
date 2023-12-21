import React from 'react'

const WeatherData = () => {
    return (
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
    )
}

export default WeatherData