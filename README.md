# React Weather App

This simple app can check the weather for cities in the world, it also display a weather details and weather icon.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Folder Structure](#folder-structure)
- [Features](#features)
- [Coding Style](#coding-style)
- [Deployment](#deployment)
- [License](#license)

## Getting Started

```bash
# clone the project
https://github.com/swiftah20/react-weatherapp.git
# run the project
npm run dev
```

## Prerequisites
- [React & Vite](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material Tailwind](https://www.material-tailwind.com/)
- [Axios](https://axios-http.com/)
- [React Toastify](https://www.npmjs.com/package/react-toastify)


## Folder Structures
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

## Features

- Find almost all cities in the world.
- Equipped with weather details.
- Displays an attractive weather icon.
- Attactive notification.

## Coding Style
ESlint + Prettier

## Deployment
```bash
# building for deployment
npm run build
```

## License
- API from [OpenWeather.org](https://openweathermap.org/)
- Weather Icon from [Iconixar](https://www.flaticon.com/authors/iconixar)
