import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HometenantComponent } from './hometenant.component';

describe('HometenantComponent', () => {
  let component: HometenantComponent;
  let fixture: ComponentFixture<HometenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HometenantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HometenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
