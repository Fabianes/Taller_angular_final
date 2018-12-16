import { Component } from '@angular/core';
import { Tarea, EstadoTarea } from '../tarea';
import { TareaBase } from '../tarea-base/tarea-base';

@Component({
  selector: 'app-tarea-en-proceso',
  templateUrl: './tarea-en-proceso.component.html',
  styleUrls: ['./tarea-en-proceso.component.css']
})
export class TareaEnProcesoComponent extends TareaBase {

  obtenerSiguienteEstado(t: Tarea) {
    return EstadoTarea.Terminada;
  }

}
