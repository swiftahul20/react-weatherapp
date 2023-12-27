# React Weather App

This simple app can check the weather for cities in the world, it also display a weather details and weather icon.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Folder Structure](#folder-structure)
- [Features](#features)
- [Coding Style](#coding-style)
- [Code Overview](#code-overview)
  - [Fetching Weather Data](fetching-weather-data)
  - [Displaying Weather Data](displaying-weather-data)   
- [Deployment](#deployment)
- [License](#license)

## Getting Started

### Prerequisites
- [React & Vite](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material Tailwind](https://www.material-tailwind.com/)
- [Axios](https://axios-http.com/)
- [React Toastify](https://www.npmjs.com/package/react-toastify)

### Installation
```bash
# clone the project
https://github.com/swiftah20/react-weatherapp.git
# move directory
cd weather-app
# install
npm install
```

### Usage
```bash
# start the development server
# localhost:5173
npm run dev
```


### Folder Structure
```
weather-app        
├── public
│   └── cloud.svg
├── src
│   ├── assets
│   │   ├── icons
│   │   │   ├── cloudy.png
│   │   │   ├── drizzle.png
│   │   │   └── ...
│   │   └── images
│   │       └── sky.jpg
│   ├── components
│   │   ├── WeatherCard.jsx
│   │   └── WeatherData.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
└── README.md
```

### Features

- Find almost all cities in the world.
- Equipped with weather details.
- Displays an attractive weather icon.
- Attactive notification.

### Coding Style
ESlint + Prettier

### Code Overview

The `WeatherCard` component is the main component of the app. It handles the user input, fetches the weather data from the OpenWeather API, and displays the weather information.

#### Fetching Weather Data

The `fetchCityData` function is responsible for fetching the weather data from the OpenWeather API. It uses the `axios` library to make the API request. The API key is stored in the `.env` file.

The `url` variable is constructed using the city name entered by the user and the API key. The `async/await` syntax is used to make the API request and handle the response.

If the API request is successful, the `setCityData`, `getWeather`, `getCountryName`, `setIcon`, and `setWindDegree` functions are called to update the state of the component with the weather data.

If the API request fails, an error message is displayed by `Toastify` to the user.

#### Displaying Weather Data

The `WeatherData` component is responsible for displaying the weather data. It receives the `cityData`, `weather`, `icon`, and `windDegree` props from the `WeatherCard` component.

The `WeatherData` component uses the `useEffect` hook to fetch the weather data from the OpenWeather API when the component is first rendered. The `useEffect` hook is also used to update the weather data when the `cityData` prop changes.

The `WeatherData` component uses the data from props passing from `WeatherCard` component.

### Deployment
```bash
# building for deployment
npm run build
```

## License
- API from [OpenWeather.org](https://openweathermap.org/)
- Weather Icon from [Iconixar](https://www.flaticon.com/authors/iconixar)
