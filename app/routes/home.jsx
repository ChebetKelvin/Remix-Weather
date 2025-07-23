import { Search } from "lucide-react";
import { useLoaderData, useNavigate } from "react-router";
import { useState } from "react";
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

// ✅ React Router Loader
export async function loader({ request }) {
  const url = new URL(request.url);
  const input = url.searchParams.get("q") || "Nairobi";

  const res = await fetch(`${apiUrl}${input}&appid=${apiKey}&units=metric`);

  if (!res.ok) throw new Error("Failed to fetch weather data");
  const data = await res.json();
  return data;
}

export default function Home() {
  const weatherData = useLoaderData();
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (input.trim()) {
      navigate(`/?q=${input.trim()}`);
      setInput("");
    }
  };

  const quickSearch = (city) => {
    navigate(`/?q=${city}`);
  };

  return (
    <div className="max-w-5xl mx-auto flex mt-10 gap-2 border-2 border-amber-300 rounded-lg">
      {/* Left Weather Display */}
      <div className="w-3/5 h-screen bg-[url('https://plus.unsplash.com/premium_photo-1669809948017-518b5d800d73?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-center relative bg-no-repeat rounded-lg">
        <div className="absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex gap-2 justify-center items-center text-white">
          <span className="text-6xl font-bold">
            {weatherData.main?.temp?.toFixed(0)}°
          </span>
          <div className="flex flex-col gap-2">
            <p className="text-3xl font-bold">{weatherData.name}</p>
            <p className="text-sm">
              {new Date().getHours()}:{new Date().getMinutes()} -{" "}
              {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].main}
              className="w-15 h-14 bg-amber-600 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Right Input Panel */}
      <div className="w-2/5 flex flex-col p-10">
        <div className="flex gap-2 w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search for a city"
            className="w-full p-2 rounded-md border-2 border-gray-300 flex-1 focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
          <Search
            className="w-12 h-12 text-white bg-amber-600 rounded-md p-2 cursor-pointer transition-all duration-300 hover:bg-amber-700 hover:scale-110"
            onClick={handleSearch}
          />
        </div>

        <hr className="my-10" />
        <ul className="flex flex-col gap-2 mt-2">
          {["Mombasa", "Meru", "Eldoret", "Kisumu"].map((city) => (
            <li
              key={city}
              className="text-lg cursor-pointer hover:text-amber-600 hover:underline"
              onClick={() => quickSearch(city)}
            >
              {city}
            </li>
          ))}
        </ul>
        <hr className="my-10" />

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Weather Details</h2>
          <div className="flex justify-between gap-2">
            <p className="text-lg">Clouds</p>
            <p className="text-lg">{weatherData.clouds?.all}%</p>
          </div>
          <div className="flex justify-between gap-2">
            <p className="text-lg">Wind</p>
            <p className="text-lg">{weatherData.wind?.speed} km/h</p>
          </div>
          <div className="flex justify-between gap-2">
            <p className="text-lg">Humidity</p>
            <p className="text-lg">{weatherData.main?.humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
