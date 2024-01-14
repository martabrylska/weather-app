import {createContext} from "react";
import {Units} from "../types/units";

export const UnitsContext = createContext({
    units: Units.metric,
    setUnits: (units: Units) => {},
})