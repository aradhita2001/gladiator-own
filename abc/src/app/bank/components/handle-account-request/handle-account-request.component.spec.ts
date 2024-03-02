import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleAccountRequestComponent } from './handle-account-request.component';

describe('HandleAccountRequestComponent', () => {
  let component: HandleAccountRequestComponent;
  let fixture: ComponentFixture<HandleAccountRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandleAccountRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandleAccountRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
