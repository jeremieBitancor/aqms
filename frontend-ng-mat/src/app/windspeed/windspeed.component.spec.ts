import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindspeedComponent } from './windspeed.component';

describe('WindspeedComponent', () => {
  let component: WindspeedComponent;
  let fixture: ComponentFixture<WindspeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindspeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindspeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
