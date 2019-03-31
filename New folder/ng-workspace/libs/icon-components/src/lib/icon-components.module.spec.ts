import { async, TestBed } from '@angular/core/testing';
import { IconComponentsModule } from './icon-components.module';

describe('IconComponentsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IconComponentsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(IconComponentsModule).toBeDefined();
  });
});
