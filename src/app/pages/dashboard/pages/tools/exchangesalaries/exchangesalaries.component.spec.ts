import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangesalariesComponent } from './exchangesalaries.component';

describe('ExchangesalariesComponent', () => {
  let component: ExchangesalariesComponent;
  let fixture: ComponentFixture<ExchangesalariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExchangesalariesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangesalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
