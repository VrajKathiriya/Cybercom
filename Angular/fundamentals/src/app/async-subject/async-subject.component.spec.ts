import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncSubjectComponent } from './async-subject.component';

describe('AsyncSubjectComponent', () => {
  let component: AsyncSubjectComponent;
  let fixture: ComponentFixture<AsyncSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsyncSubjectComponent]
    });
    fixture = TestBed.createComponent(AsyncSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
