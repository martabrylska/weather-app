export interface ActualWeather {
        time: number,
        temp: number,
        tempMax: number,
        tempMin: number,
        desc: string,
        short: string,
        timezone: number,
    }

export interface ShortTermWeather {
        time: number,
        temp: number,
        desc: string,
        icon: string,
        pod: string,
}