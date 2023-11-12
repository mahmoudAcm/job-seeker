'use client';
import React, { useState } from 'react';
import { getWeatherDataByCoordinates } from '../utils/weather';
import Image from 'next/image';

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
}

const Home: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const [weatherData, setWeatherData] = useState<null | WeatherData>(null);

  const fetchWeather = async () => {
    try {
      setOpen(true);
      navigator.geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;
          const data = await getWeatherDataByCoordinates(latitude, longitude);
          setWeatherData(data);
        },
        error => {
          console.error('Error getting location:', error);
          // Handle error getting location
        }
      );
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Handle error-fetching weather data
    }
  };

  const iconURL = `http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`;

  console.log(weatherData);

  return (
    <>
      <button
        onClick={fetchWeather}
        className='fixed right-[1rem] top-[1rem] px-[1.31rem] py-[1rem] select-none bg-[#E3E3E345] rounded-[31px] text-[#B2B2B2]'
      >
        Get Weather
      </button>

      {isOpen && weatherData && (
        <div className='fixed inset-0 h-full w-full px-[1rem]'>
          <div className='absolute inset-0 -z-0 h-full w-full bg-black/10' onClick={() => setOpen(false)}></div>
          <div className='absolute z-10 select-none text-white top-[100px] right-[1rem]'>
            <h3 className='absolute top-[1.51rem] left-[2.3rem] text-[3rem]'>{weatherData.main.temp}°</h3>
            <Image
              src={iconURL}
              alt={weatherData.weather[0].description}
              width='100'
              height='100'
              className='absolute -top-7 -right-4'
            />
            <div className='absolute flex w-full items-end justify-between bottom-[1rem] px-[2.3rem] gap-[1rem]'>
              <div className='grid place-items-start'>
                <p className='text-[0.8125rem] text-[#EBEBF599] flex gap-[0.5rem]'>
                  <span>H:{weatherData.main.temp_max}°</span> <span>L:{weatherData.main.temp_min}°</span>
                </p>
                <span className='text-[1.0625rem]'>
                  {weatherData.name}, {weatherData.sys.country}
                </span>
              </div>
              <span className='capitalize text-[0.8125rem] leading-[1.38462]'>
                {weatherData.weather[0].description}
              </span>
            </div>
            <svg
              width='351'
              height='185'
              viewBox='0 0 351 185'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='w-full'
            >
              <path
                d='M0 30.9242C0 11.5641 18.0656 -2.72669 36.9058 1.72984L334.064 72.021C343.99 74.3688 351 83.2308 351 93.4302V163C351 175.15 341.15 185 329 185H22C9.84973 185 0 175.15 0 163V30.9242Z'
                fill='url(#paint0_linear_51_11)'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_51_11'
                  x1='345.225'
                  y1='131.605'
                  x2='-15.8717'
                  y2='131.605'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop offset='0.395833' stopColor='#362A8A' />
                  <stop offset='0.994792' stopColor='#5936B4' />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
