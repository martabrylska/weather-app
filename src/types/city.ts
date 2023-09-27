export interface City {
        name: string,
        state: string,
        country: string,
        lat: string,
        lon: string,
        temp: string,
        tempMax: string,
        tempMin: string,
        desc: string,
        short: string,
    }

export interface Weather {
        time: string[],
        temp: string,
        desc: string,
        icon: string,
}