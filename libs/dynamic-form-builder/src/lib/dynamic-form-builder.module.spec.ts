import { async, TestBed } from '@angular/core/testing';
import { DynamicFormBuilderModule } from './dynamic-form-builder.module';

describe('DynamicFormBuilderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DynamicFormBuilderModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DynamicFormBuilderModule).toBeDefined();
  });
});
