import {createContext} from "react";
import {SearchedCity} from "../types/city";

export const SearchContext = createContext({
    search: {
        name: '',
        state: '',
        country: '',
        lat: 0,
        lon: 0,
    },
    setSearch: (s: SearchedCity) => {},
});