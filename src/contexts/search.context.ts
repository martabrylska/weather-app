import {createContext} from "react";
import {SearchCity} from "../types/city";

export const SearchContext = createContext({
    search: {
        name: '',
        state: '',
        country: '',
        lat: 0,
        lon: 0,
    },
    setSearch: (s: SearchCity) => {},
});