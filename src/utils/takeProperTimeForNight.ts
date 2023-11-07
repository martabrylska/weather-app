export const takeProperTimeForNight = (timezone: number): string => {
    const tz = timezone / 3600;

    switch (tz) {
        case 12:
        case -12:
        case -11:
        case -10:
            return '12:00:00';
        case -9:
        case -8:
        case -7:
            return '09:00:00';
        case -6:
        case -5:
        case -4:
            return '06:00:00';
        case -3:
        case -2:
        case -1:
            return '03:00:00';
        case 0:
        case 1:
        case 2:
            return '00:00:00';
        case 3:
        case 4:
        case 5:
            return '21:00:00';
        case 6:
        case 7:
        case 8:
            return '18:00:00';
        case 9:
        case 10:
        case 11:
            return '15:00:00';
        default:
            return '';
    }
}
