export function toHours(totalMinutes: number) : { hours: number, minutes: number }{
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
}