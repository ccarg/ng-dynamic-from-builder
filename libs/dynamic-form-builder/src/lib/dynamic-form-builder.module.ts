import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormBuilderService } from './dynamic-form-builder-service';

@NgModule({
  declarations: [DynamicFormBuilderService],
  imports: [CommonModule],
  exports: [DynamicFormBuilderService]
})
export class DynamicFormBuilderModule {}
