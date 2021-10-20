import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplacementAddComponent } from './displacement-add.component';

describe('DisplacementAddComponent', () => {
  let component: DisplacementAddComponent;
  let fixture: ComponentFixture<DisplacementAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplacementAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplacementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
