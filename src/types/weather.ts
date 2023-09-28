export interface ActualWeather {
        temp: string,
        tempMax: string,
        tempMin: string,
        desc: string,
        short: string,
    }

export interface ShortTermWeather {
        time: string[],
        temp: string,
        desc: string,
        icon: string,
}