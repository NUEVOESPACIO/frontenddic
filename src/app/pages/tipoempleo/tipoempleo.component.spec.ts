import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoempleoComponent } from './tipoempleo.component';

describe('TipoempleoComponent', () => {
  let component: TipoempleoComponent;
  let fixture: ComponentFixture<TipoempleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoempleoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoempleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
