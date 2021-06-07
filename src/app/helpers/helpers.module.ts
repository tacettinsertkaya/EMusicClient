import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScrollToBottomDirective} from './directives/scroll-to-bottom.directive';
import {DatemonthPipe} from './pipes/datemonth.pipe';
import {DatetimePipe} from './pipes/datetime.pipe';
import {TimePipe} from './pipes/time.pipe';
import {ValuesPipe} from './pipes/values.pipe';
import {DatePipe} from '../helpers/pipes/date.pipe';


@NgModule({
  declarations: [
    ScrollToBottomDirective,
    DatePipe,
    DatemonthPipe,
    DatetimePipe,
    TimePipe,
    ValuesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ScrollToBottomDirective,
    DatePipe,
    DatemonthPipe,
    DatetimePipe,
    TimePipe,
    ValuesPipe
  ]
})
export class HelpersModule {
}
