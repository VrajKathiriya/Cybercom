import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaySubjectComponent } from './replay-subject.component';

describe('ReplaySubjectComponent', () => {
  let component: ReplaySubjectComponent;
  let fixture: ComponentFixture<ReplaySubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReplaySubjectComponent]
    });
    fixture = TestBed.createComponent(ReplaySubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
