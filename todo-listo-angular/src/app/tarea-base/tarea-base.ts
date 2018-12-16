import { Input, Output, EventEmitter } from '@angular/core';
import { Tarea } from '../tarea';

export abstract class TareaBase {

  @Input() tarea: Tarea;
  @Output() tareaActualizada = new EventEmitter<Tarea>();

  constructor() { }

  pasarSiguienteEstado() {
    this.tarea.estado = this.obtenerSiguienteEstado(this.tarea);
    this.tareaActualizada.emit(this.tarea);
  }

  abstract obtenerSiguienteEstado(t: Tarea);

}

