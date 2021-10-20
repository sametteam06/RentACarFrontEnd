import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNameUpdateComponent } from './user-name-update.component';

describe('UserNameUpdateComponent', () => {
  let component: UserNameUpdateComponent;
  let fixture: ComponentFixture<UserNameUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNameUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNameUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
