import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviouscontractComponent } from './previouscontract.component';

describe('PreviouscontractComponent', () => {
  let component: PreviouscontractComponent;
  let fixture: ComponentFixture<PreviouscontractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviouscontractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviouscontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
