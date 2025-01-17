import { FC } from "react";
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Moon, Wind, CloudSun } from "lucide-react";

type WeatherIconCode =
  | "01d" | "01n"
  | "02d" | "02n"
  | "03d" | "03n"
  | "04d" | "04n"
  | "09d" | "09n"
  | "10d" | "10n"
  | "11d" | "11n"
  | "13d" | "13n"
  | "50d" | "50n";

const getColorByIconCode = (iconCode: WeatherIconCode): string => {
  const colorMap: Record<WeatherIconCode, string> = {
    "01d": "text-yellow-500",
    "01n": "text-blue-700",
    "02d": "text-yellow-400",
    "02n": "text-gray-400",
    "03d": "text-yellow-300",
    "03n": "text-gray-600",
    "04d": "text-gray-700",
    "04n": "text-gray-800",
    "09d": "text-blue-400",
    "09n": "text-blue-500",
    "10d": "text-blue-600",
    "10n": "text-blue-700",
    "11d": "text-purple-500",
    "11n": "text-purple-700",
    "13d": "text-white",
    "13n": "text-gray-200",
    "50d": "text-gray-400",
    "50n": "text-gray-500",
  };

  return colorMap[iconCode] || "text-gray-500";
};

const getWeatherIcon = (iconCode: WeatherIconCode): JSX.Element => {
  const IconMap: Record<WeatherIconCode, typeof Sun> = {
    "01d": Sun,
    "01n": Moon,
    "02d": Cloud,
    "02n": Cloud,
    "03d": CloudSun,
    "03n": Cloud,
    "04d": Cloud,
    "04n": Cloud,
    "09d": CloudRain,
    "09n": CloudRain,
    "10d": CloudRain,
    "10n": CloudRain,
    "11d": CloudLightning,
    "11n": CloudLightning,
    "13d": CloudSnow,
    "13n": CloudSnow,
    "50d": Wind,
    "50n": Wind,
  };

  const Icon = IconMap[iconCode] || Cloud;
  const colorClass = getColorByIconCode(iconCode);

  return <Icon className={`w-24 h-24 ${colorClass}`} />;
};

interface WeatherIconProps {
  iconCode: WeatherIconCode;
}

const WeatherIcon: FC<WeatherIconProps> = ({ iconCode }) => {
  return getWeatherIcon(iconCode);
};

export default WeatherIcon;
