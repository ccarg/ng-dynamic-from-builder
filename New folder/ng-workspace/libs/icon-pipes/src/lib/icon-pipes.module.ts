import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearRangePipe } from './year-range.pipe';
import { QuarterRangePipe } from './quarter-range.pipe';
import { MoneyPipe } from './money.pipe';
import { FilterListByPipe } from './filter-list-by.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [YearRangePipe, QuarterRangePipe, MoneyPipe, FilterListByPipe],  
    exports: [YearRangePipe, QuarterRangePipe, MoneyPipe, FilterListByPipe]
})
export class IconPipesModule {}
