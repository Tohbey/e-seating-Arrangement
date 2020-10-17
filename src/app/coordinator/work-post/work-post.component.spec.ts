import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPostComponent } from './work-post.component';

describe('WorkPostComponent', () => {
  let component: WorkPostComponent;
  let fixture: ComponentFixture<WorkPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
