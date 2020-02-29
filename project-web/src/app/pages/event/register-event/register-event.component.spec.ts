import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEventComponent } from './register-event.component';

describe('RegisterEventComponent', () => {
  let component: RegisterEventComponent;
  let fixture: ComponentFixture<RegisterEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
