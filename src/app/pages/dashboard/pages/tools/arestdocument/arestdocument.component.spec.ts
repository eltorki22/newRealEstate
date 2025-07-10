import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArestdocumentComponent } from './arestdocument.component';

describe('ArestdocumentComponent', () => {
  let component: ArestdocumentComponent;
  let fixture: ComponentFixture<ArestdocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArestdocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArestdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
