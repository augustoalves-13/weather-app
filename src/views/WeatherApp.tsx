import {
  Sunrise,
  Sunset,
  ThermometerSnowflake,
  ThermometerSun,
} from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { request } from "../utils/fetch";
import { formatter } from "../utils/formatter";
import dayjs from "dayjs";
import WeatherIcon from "../utils/icons";
import CitySearch from "../components/CitySearch";

const WeatherApp = () => {
  const [currentCity, setCurrentCity] = useState("São Paulo");

  const { data, mutate } = useSWR<any>("weather", (key: string) =>
    request(key, "GET", { body: { city: currentCity } })
  );

  useEffect(() => {
    mutate()
  },[currentCity])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 max-w-sm w-full">
        <CitySearch onCityChange={(city) => setCurrentCity(city)} />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">{currentCity}</h2>
          <span className="text-xl text-white">Hoje</span>
        </div>

        <div className="flex justify-center mb-6">
          <WeatherIcon iconCode={data?.weather[0].icon} />
        </div>

        <div className="text-center mb-6">
          <span className="text-6xl font-bold text-white">
            {formatter.kelvinToCelsius(data?.main.temp)}°C
          </span>
          <p className="text-xl text-white mt-2">
            {data?.weather[0].description}
          </p>
        </div>

        <div className="flex justify-between text-white mb-6">
          <div className="text-center">
            <p className="font-bold">Umidade</p>
            <p>{data?.main.humidity}%</p>
          </div>
          <div className="text-center">
            <p className="font-bold">Vento</p>
            <p>{data?.wind.speed.toFixed()} km/h</p>
          </div>
          <div className="text-center">
            <p className="font-bold">Sensação</p>
            <p>{formatter.kelvinToCelsius(data?.main.feels_like)}°C</p>
          </div>
        </div>

        <div className="border-t border-white border-opacity-20 pt-6">
          <h3 className="text-xl font-bold text-white mb-4">
            Outras informações
          </h3>
          <div className="flex justify-between">
            <div className="text-center text-white">
              <p className="font-bold">Nascer do sol</p>
              <Sunrise className="w-8 h-8 mx-auto my-2" />
              <p>{dayjs.unix(data?.sys.sunrise).format("HH:mm")}</p>
            </div>
            <div className="text-center text-white">
              <p className="font-bold">Por do sol</p>
              <Sunset className="w-8 h-8 mx-auto my-2" />
              <p>{dayjs.unix(data?.sys.sunset)?.format("HH:mm")}</p>
            </div>
            <div className="text-center text-white">
              <p className="font-bold">Min.</p>
              <ThermometerSnowflake className="w-8 h-8 mx-auto my-2" />
              <p>{formatter.kelvinToCelsius(data?.main.temp_min)}°C</p>
            </div>
            <div className="text-center text-white">
              <p className="font-bold">Máx.</p>
              <ThermometerSun className="w-8 h-8 mx-auto my-2" />
              <p>{formatter.kelvinToCelsius(data?.main.temp_max)}°C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
