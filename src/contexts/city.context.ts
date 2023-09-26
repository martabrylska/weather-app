import {createContext} from "react";
import {City} from "../types/city";

export const CityContext = createContext({
    city: {
        name: "London",
        state: "England",
        country: "GB",
        lat: "",
        lon: "",
        temp: "",
        tempMax: "",
        tempMin: "",
    },
    setCity: (city: City) => {},
});