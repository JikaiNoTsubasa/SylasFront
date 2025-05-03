import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shrink'
})
export class ShrinkPipe implements PipeTransform {

  transform(value: string, ...args: number[]): string {
    if (!args[0]) return value;
    if (!value) return '';
    if (value.length > args[0]) return value.substring(0, args[0]) + '...';
    return value;
  }

}
