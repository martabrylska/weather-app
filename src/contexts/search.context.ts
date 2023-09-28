import {createContext} from "react";
import {SearchCity} from "../types/city";

export const SearchContext = createContext({
    search: {
        name: '',
        state: '',
        country: '',
        lat: '',
        lon: '',
    },
    setSearch: (s: SearchCity) => {},
});