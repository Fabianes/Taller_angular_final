import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaEnProcesoComponent } from './tarea-en-proceso.component';

describe('TareaEnProcesoComponent', () => {
  let component: TareaEnProcesoComponent;
  let fixture: ComponentFixture<TareaEnProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareaEnProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaEnProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
