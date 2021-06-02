import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WrongRouteComponent } from './wrong-route.component';

describe('WrongRouteComponent', () => {
  let component: WrongRouteComponent;
  let fixture: ComponentFixture<WrongRouteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WrongRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
