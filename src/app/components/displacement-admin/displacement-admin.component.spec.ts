import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplacementAdminComponent } from './displacement-admin.component';

describe('DisplacementAdminComponent', () => {
  let component: DisplacementAdminComponent;
  let fixture: ComponentFixture<DisplacementAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplacementAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplacementAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
