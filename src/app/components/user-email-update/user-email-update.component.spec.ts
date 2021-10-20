import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEmailUpdateComponent } from './user-email-update.component';

describe('UserEmailUpdateComponent', () => {
  let component: UserEmailUpdateComponent;
  let fixture: ComponentFixture<UserEmailUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEmailUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEmailUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
