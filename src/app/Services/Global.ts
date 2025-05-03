export function toHours(totalMinutes: number) : { hours: number, minutes: number }{
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
}

export function shrinkText(text: string, length: number): string {
    if (text.length > length) {
        return text.substring(0, length) + '...';
    }
    return text;
}