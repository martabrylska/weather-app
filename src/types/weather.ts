export interface ActualWeather {
        time: number;
        temp: number;
        tempMax: number;
        tempMin: number;
        tempSensed: number;
        humidity: number;
        pressure: number;
        wind: number;
        clouds: number;
        rain: number;
        snow: number;
        desc: string;
        short: string;
        timezone: number;
    }

export interface ShortTermWeather {
        time: number,
        temp: number,
        desc: string,
        icon: string,
        pod: string,
        rain: number,
        snow: number,
}
