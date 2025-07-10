import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalafisComponent } from './salafis.component';

describe('SalafisComponent', () => {
  let component: SalafisComponent;
  let fixture: ComponentFixture<SalafisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalafisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalafisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
