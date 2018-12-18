import { Injectable } from '@angular/core';
import { Tarea } from './tarea';
import { Observable, of, empty } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor(private http: HttpClient) { }

  crearTarea(t: Tarea): Observable<any> {
    return this.http.post('http://localhost:8000/tareas/', {
      'titulo': t.titulo,
      'descripcion': t.descripcion,
      'estado': t.estado,
      'fecha_inicio': t.fecha_inicio,
      'latitud': t.latitud,
      'longitud': t.longitud,
    })
  }

  actualizarTarea(t: Tarea): Observable<any> {
    console.log(t);
    return this.http.put(`http://localhost:8000/tareas/${t.id}/`, {
      'titulo': t.titulo,
      'descripcion': t.descripcion,
      'estado': t.estado,
      'fecha_inicio': t.fecha_inicio,
      'fecha_termino': t.fecha_termino,  
      'latitud': t.latitud,
      'longitud': t.longitud,
    })
  }

  getTareas(user_token): Observable<any> {
    console.log(`Tarea service user_token: ${user_token}`);
    return this.http.get('http://localhost:8000/tareas/', {
      headers: {'Authorization': `Token ${user_token}`}
    });
  }
}
