import {createContext} from "react";
import {Units} from "../types/units";

export const UnitsContext = createContext({
    units: 'metric',
    setUnits: (units: Units) => {},
})