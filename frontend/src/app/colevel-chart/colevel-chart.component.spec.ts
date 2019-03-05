import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColevelChartComponent } from './colevel-chart.component';

describe('ColevelChartComponent', () => {
  let component: ColevelChartComponent;
  let fixture: ComponentFixture<ColevelChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColevelChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColevelChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
