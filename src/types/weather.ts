export interface ActualWeather {
        temp: number,
        tempMax: number,
        tempMin: number,
        desc: string,
        short: string,
        timezone: number,
    }

export interface ShortTermWeather {
        time: string[],
        temp: number,
        desc: string,
        icon: string,
}