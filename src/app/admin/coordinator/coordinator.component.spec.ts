import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CoordinatorComponent } from './coordinator.component';

describe('CoordinatorComponent', () => {
  let component: CoordinatorComponent;
  let fixture: ComponentFixture<CoordinatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
