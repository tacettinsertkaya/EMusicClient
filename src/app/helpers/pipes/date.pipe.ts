import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(date: any, format = 'DD.MM.YYYY'): string {
    return moment(date).format(format);
  }

}
