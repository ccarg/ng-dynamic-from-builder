import { async, TestBed } from '@angular/core/testing';
import { IconServiceModule } from './icon-service.module';

describe('IconServiceModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IconServiceModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(IconServiceModule).toBeDefined();
  });
});
