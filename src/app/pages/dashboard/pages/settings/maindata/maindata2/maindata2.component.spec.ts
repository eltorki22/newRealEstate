import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Maindata2Component } from './maindata2.component';

describe('Maindata2Component', () => {
  let component: Maindata2Component;
  let fixture: ComponentFixture<Maindata2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Maindata2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Maindata2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
