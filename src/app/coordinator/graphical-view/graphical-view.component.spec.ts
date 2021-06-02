import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GraphicalViewComponent } from './graphical-view.component';

describe('GraphicalViewComponent', () => {
  let component: GraphicalViewComponent;
  let fixture: ComponentFixture<GraphicalViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
