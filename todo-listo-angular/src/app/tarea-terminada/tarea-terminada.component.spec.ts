import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaTerminadaComponent } from './tarea-terminada.component';

describe('TareaTerminadaComponent', () => {
  let component: TareaTerminadaComponent;
  let fixture: ComponentFixture<TareaTerminadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareaTerminadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaTerminadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
