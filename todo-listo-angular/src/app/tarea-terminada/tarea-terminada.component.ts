import { Component } from '@angular/core';
import { Tarea } from '../tarea';
import { TareaBase } from '../tarea-base/tarea-base';

@Component({
  selector: 'app-tarea-terminada',
  templateUrl: './tarea-terminada.component.html',
  styleUrls: ['./tarea-terminada.component.css']
})
export class TareaTerminadaComponent extends TareaBase {

  obtenerSiguienteEstado(t: Tarea) {
    /* No hace nada, no hay mas estados */
  }

}
