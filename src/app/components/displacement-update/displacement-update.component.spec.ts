import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplacementUpdateComponent } from './displacement-update.component';

describe('DisplacementUpdateComponent', () => {
  let component: DisplacementUpdateComponent;
  let fixture: ComponentFixture<DisplacementUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplacementUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplacementUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
