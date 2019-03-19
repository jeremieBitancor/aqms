import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindspeedChartComponent } from './windspeed-chart.component';

describe('WindspeedChartComponent', () => {
  let component: WindspeedChartComponent;
  let fixture: ComponentFixture<WindspeedChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindspeedChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindspeedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
