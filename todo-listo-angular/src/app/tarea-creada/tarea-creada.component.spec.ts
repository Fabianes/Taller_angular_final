import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaCreadaComponent } from './tarea-creada.component';

describe('TareaCreadaComponent', () => {
  let component: TareaCreadaComponent;
  let fixture: ComponentFixture<TareaCreadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareaCreadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaCreadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
