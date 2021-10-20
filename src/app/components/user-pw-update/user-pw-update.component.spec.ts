import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPwUpdateComponent } from './user-pw-update.component';

describe('UserPwUpdateComponent', () => {
  let component: UserPwUpdateComponent;
  let fixture: ComponentFixture<UserPwUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPwUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPwUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
