import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencialComponent } from './experiencial.component';

describe('ExperiencialComponent', () => {
  let component: ExperiencialComponent;
  let fixture: ComponentFixture<ExperiencialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperiencialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperiencialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
