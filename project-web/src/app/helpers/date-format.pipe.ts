import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatPipe'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
