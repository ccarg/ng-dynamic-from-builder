import { async, TestBed } from '@angular/core/testing';
import { IconDocumentsModule } from './icon-documents.module';

describe('IconDocumentsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IconDocumentsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(IconDocumentsModule).toBeDefined();
  });
});
