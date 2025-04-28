import { Pipe, PipeTransform } from '@angular/core';
import { toHours } from '../Services/Global';

@Pipe({
  name: 'tohours',
  standalone: true
})
export class TohoursPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    var res = toHours(value);
    var mins = res.minutes.toString().padStart(2, '0');
    return `${res.hours}h${mins}`;
  }

}
