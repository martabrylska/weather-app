<div align="center">
  <h1>Weather App</h1>  <img src="https://raw.githubusercontent.com/martabrylska/weather-app/main/public/logo2.png" alt="logo"/>
<p>Please see the page: <a href="https://weatherapp.networkmanager.pl/">https://weatherapp.networkmanager.pl/</a></p>
</div>

# Table of Contents

- [About the Project](#about-the-project-🎉)
    - [Screenshots](#screenshots-📺)
    - [Tech Stack](#tech-stack-🔧)
- [Getting Started](#getting-started-🚀)
    - [Run the app locally](#run-the-app-locally)
- [Live](#live-📍)

## About the project 🎉

The app show you actual weather. You can choose the place from cities all over the world. There are also register and
login panels.
After signing in you can add city to your favorites list, where you can use filters. On login panel you can also change
your password and units of measurement.
The app uses eg.:
- (FE) fetching data from external weather API: [https://openweathermap.org/api](https://openweathermap.org/api),
- (FE) localStorage (React hook) to store username, searched city and logging info,
- (FE) React contexts (logging info, serached city, units of measurment),
- (BE) cookie to keep the logging session,
- (BE) JWT token for user authorising.

### Screenshots 📺

<div>
  <img src="https://raw.githubusercontent.com/martabrylska/weather-app/main/public/app-screens/home.JPG" alt="home page" width="220px" height="auto"/>
  <img src="https://raw.githubusercontent.com/martabrylska/weather-app/main/public/app-screens/register.JPG" alt="register view" width="220px" height="auto"/>
  <img src="https://raw.githubusercontent.com/martabrylska/weather-app/main/public/app-screens/login.JPG" alt="login view" width="220px" height="auto"/>
  <img src="https://raw.githubusercontent.com/martabrylska/weather-app/main/public/app-screens/favorites.JPG" alt="favorites view" width="220px" height="auto"/>
</div>

### Tech stack 🔧

  <ul>
    <li><a href="https://react.dev/">React.js</a></li>
    <li><a href="https://nestjs.com/">Nest.js</a></li>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://typeorm.io/">TypeORM</a></li>
    <li><a href="https://jwt.io/">JWT Token</a></li>
  </ul>

## Getting started 🚀

### Run the app locally

1. Get a free API Key at: [https://openweathermap.org/api](https://openweathermap.org/api).
   You have to register first.
2. Clone the frontend repo [https://github.com/martabrylska/weather-app](https://github.com/martabrylska/weather-app):

   ` git clone https://github.com/martabrylska/weather-app.git`

3. Make .env file and paste your API Key:

   `REACT_APP_API_KEY="your_api_key"`

4. Install NPM packages:

   `npm install`

5. Start the server development:

   `npm start`

6. Run the backend of the
   app: [https://github.com/martabrylska/weather-app-BE](https://github.com/martabrylska/weather-app-BE)

   `git clone https://github.com/martabrylska/weather-app-be.git`

7. Go to file src/config/config.example.ts and change it to config.ts.

   Uncomment the contents of the file and make configuration where is needed.

8. Install NPM packages and start development mode:

   `npm install`

   `npm run start:dev`

9. You can now test the app.


## Live 📍

<p><a href="https://weatherapp.networkmanager.pl/">https://weatherapp.networkmanager.pl/</a></p>