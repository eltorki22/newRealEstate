import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractrenewalComponent } from './contractrenewal.component';

describe('ContractrenewalComponent', () => {
  let component: ContractrenewalComponent;
  let fixture: ComponentFixture<ContractrenewalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractrenewalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractrenewalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
