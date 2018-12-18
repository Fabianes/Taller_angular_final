import { Component } from '@angular/core';
import { Tarea } from '../tarea';
import { TareaBase } from '../tarea-base/tarea-base';

@Component({
  selector: 'app-tarea-terminada',
  templateUrl: './tarea-terminada.component.html',
  styleUrls: ['./tarea-terminada.component.css']
})
export class TareaTerminadaComponent extends TareaBase {

  fechaTerminoTarea(){
  	this.tarea.fecha_termino = new Date();
  	console.log(this.tarea);
    this.tareaActualizada.emit(this.tarea);
  }
  
  obtenerSiguienteEstado(t: Tarea) {
    /* No hace nada, no hay mas estados */
  }
  finalizarTarea(){
  	return new Date();
  }
}
