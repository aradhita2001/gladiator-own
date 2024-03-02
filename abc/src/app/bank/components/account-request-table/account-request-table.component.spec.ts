import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRequestTableComponent } from './account-request-table.component';

describe('AccountRequestTableComponent', () => {
  let component: AccountRequestTableComponent;
  let fixture: ComponentFixture<AccountRequestTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountRequestTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountRequestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
