import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColevelComponent } from './colevel.component';

describe('ColevelComponent', () => {
  let component: ColevelComponent;
  let fixture: ComponentFixture<ColevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
