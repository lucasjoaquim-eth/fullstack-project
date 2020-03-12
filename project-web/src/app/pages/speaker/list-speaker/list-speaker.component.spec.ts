import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSpeakerComponent } from './list-speaker.component';

describe('ListSpeakerComponent', () => {
  let component: ListSpeakerComponent;
  let fixture: ComponentFixture<ListSpeakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSpeakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSpeakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
