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

export function getISOWeekNumber(date: Date): number {
  const tempDate = new Date(date.getTime());
  tempDate.setHours(0, 0, 0, 0);
  tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
  const firstThursday = tempDate.getTime();
  tempDate.setMonth(0, 1);
  if (tempDate.getDay() !== 4) {
    tempDate.setMonth(0, 1 + ((4 - tempDate.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - tempDate.getTime()) / 604800000);
}

export function getDatesOfISOWeek(week: number, year: number): Date[] {
  const simple = new Date(year, 0, 1 + (week - 1) * 7);
  const dayOfWeek = simple.getDay();
  let ISOweekStart = simple;
  // Ajuster pour que la semaine commence LUNDI
  if (dayOfWeek <= 4 && dayOfWeek !== 0) {
    ISOweekStart.setDate(simple.getDate() - (dayOfWeek - 1));
  } else if (dayOfWeek === 0) { // dimanche=>lundi précédent
    ISOweekStart.setDate(simple.getDate() - 6);
  } else {
    ISOweekStart.setDate(simple.getDate() + (1 - dayOfWeek));
  }
  // Générer les 7 dates de la semaine
  return Array.from({ length: 7 }, (_, idx) => {
    const d = new Date(ISOweekStart);
    d.setDate(ISOweekStart.getDate() + idx);
    return d;
  });
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&           // Les mois sont 0-based (janvier=0)
    date1.getDate() === date2.getDate()
  );
}