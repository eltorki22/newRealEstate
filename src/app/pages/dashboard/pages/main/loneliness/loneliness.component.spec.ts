import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LonelinessComponent } from './loneliness.component';

describe('LonelinessComponent', () => {
  let component: LonelinessComponent;
  let fixture: ComponentFixture<LonelinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LonelinessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LonelinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
