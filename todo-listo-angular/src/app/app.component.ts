import { Component, OnInit } from '@angular/core';
import { Tarea, EstadoTarea } from './tarea';
import { TareaService } from './tarea.service';
import { interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'Todo Listo!';
  estadoTareas = EstadoTarea;
  tareaSeleccionada: Tarea;
  tareas: Array<Tarea>;
  newTarea: Tarea;

  username: string;
  password: string;
  loggedIn = false;
  user_token: string;
  options;
  options2;
  layersControl;
  tareasMapaFlag = false;

  constructor(public tareaService: TareaService, private http: HttpClient, private datePipe: DatePipe) {
    this.tareas = [];
    this.newTarea = new Tarea(null, null, null, null, null, null, null, null);
    let maybe_user_token = window.localStorage.getItem('user_token');
    console.log(`ls user token: ${maybe_user_token}`);
    if(maybe_user_token) {
      this.loggedIn = true;
      this.user_token = maybe_user_token; 
    }
  }

  iniciarSesion() {
    console.log(`u: ${this.username} - p: ${this.password}`);  
    this.http.post('http://localhost:8000/rest-auth/login/', {
      'username': this.username,
      'password': this.password,
    }).subscribe(res => {
        console.log(`res: ${res['key']}`);
        this.loggedIn = true;
        this.user_token = res['key'];
        window.localStorage.setItem('user_token', res['key']);
        this.refrescarTareas();
    })  
  }
  cerrarSesion() {
    console.log(`u: ${this.username} - p: ${this.password}`);  
    this.http.post('http://localhost:8000/rest-auth/logout/', {
      'username': this.username,
      'password': this.password,
    }).subscribe(res => {
        this.loggedIn = false;
        //maybe_user_token = window.localStorage.clear();
    })  
  }
  cerrarSesion() {
    console.log(`u: ${this.username} - p: ${this.password}`);  
    this.http.post('http://localhost:8000/rest-auth/logout/', {
      'username': this.username,
      'password': this.password,
    }).subscribe(res => {
        this.loggedIn = false;
        window.localStorage.clear();
    })  
  }

  ngOnInit() {

    this.options = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 15,      
      center: L.latLng(-33.0454915,-71.6124715),
    };
    
    this.refrescarTareas();
    interval(30 * 1000).subscribe(_ => {
      console.log('Refrescando tareas');
      this.refrescarTareas();
    });
    
  }

  refrescarTareas() {
    this.tareaService.getTareas(this.user_token)
      .subscribe((ts: Array<Tarea>) => {
        this.tareas = ts;
      });
  }

  mapClick(evt) {
    console.log(`Click: ${evt}`);
    console.log(Object.keys(evt));
    console.log(evt['latlng']);
    let latlng = evt['latlng'];
    this.newTarea.latitud = latlng['lat'];
    this.newTarea.longitud = latlng['lng'];
    this.addMarker(evt['latlng']);
  }

  markers: L.Layer[] = [];
  markers2: L.Layer[] = [];

  tareasMapa(){
    this.tareasMapaFlag = true;
    this.options2 = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 15,      
      center: L.latLng(-33.0454915,-71.6124715),
    };
    this.llenarMapa();
  }

  volver(){
    this.tareasMapaFlag = false;
    this.options = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 15,      
      center: L.latLng(-33.0454915,-71.6124715),
    };
  }

  llenarMapa(){
    console.log(this.tareas);
    let largo = this.tareas.length;
    console.log(largo);
    for(var i = 0; i < this.tareas.length; i++){
      if (this.tareas[i].latitud != null){
          const newMarker2 = L.marker([this.tareas[i].latitud,  this.tareas[i].longitud], {
          icon: L.icon({
             iconSize: [ 25, 41 ],
             iconAnchor: [ 13, 41 ],
             iconUrl:   'assets/marker-icon.png',
             shadowUrl: 'assets/marker-shadow.png'
          })
        });
        let fecha_inicio_parse = this.datePipe.transform(this.tareas[i].fecha_inicio,"dd-MM-yyyy");
        let fecha_termino_parse = this.datePipe.transform(this.tareas[i].fecha_termino,"dd-MM-yyyy");
        if (fecha_termino_parse == null){
          fecha_termino_parse = '-';
        }
        newMarker2.bindPopup("<b>Título:</b><br/>"+this.tareas[i].titulo
          +"<br/><b>Descripción:</b><br/>"+this.tareas[i].descripcion
          +"<br/><b>Fecha de Creación:</b><br/>"+fecha_inicio_parse
          +"<br/><b>Fecha de Término:</b><br/>"+fecha_termino_parse);
        this.markers2.push(newMarker2);
      }
      
    }
    

  }

  addMarker(latlng) {
    const newMarker = L.marker([latlng['lat'],  latlng['lng']], {
      icon: L.icon({
         iconSize: [ 25, 41 ],
         iconAnchor: [ 13, 41 ],
         iconUrl:   'assets/marker-icon.png',
         shadowUrl: 'assets/marker-shadow.png'
      })
    });
    
    while(this.markers.length > 0) {
      this.markers.pop();
    }
		this.markers.push(newMarker);
    console.log(this.markers);
	}

  actualizarTarea(t: Tarea) {
    console.log(`La tarea ${t} fue actualizada!`);
    this.tareaService.actualizarTarea(t).subscribe(_ => { });
  }

  seleccionarTarea(t: Tarea) {
    this.tareaSeleccionada = t;
  }

  crearTarea() {
    this.newTarea.fecha_inicio = new Date();
    this.newTarea.estado = 0;
    if(this.newTarea.latitud == null){
      this.newTarea.latitud = undefined;
      this.newTarea.longitud = undefined;
    }
    console.log(this.newTarea);
    this.tareaService.crearTarea(this.newTarea).subscribe(_ => {
      console.log('Creacion Tarea OK');
      this.refrescarTareas();

    })
  }

  estado2str(e: EstadoTarea) {
    switch (e) {
      case EstadoTarea.Creada: return 'Creada';
      case EstadoTarea.EnProceso: return 'En Proceso';
      case EstadoTarea.Terminada: return 'Terminada';
    }
  }

}































/*
export class AppComponent implements OnInit {
  title = 'Todo Listo!';
  estadoTareas = EstadoTarea;
  tareaSeleccionada: Tarea;
  tareas: Array<Tarea>;
  newTarea: ITarea;
  estado2str = estado2str;

  constructor(private tareaService: TareaService) {
    this.tareas = [];
    this.newTarea = {
      titulo: '',
      descripcion: ''
    };
  }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.tareaService.getTareas()
        .subscribe(tareas => {
          this.tareas = tareas;
        });
  }

  seleccionarTarea(t: Tarea) {
    this.tareaSeleccionada = t;
  }

  crearTarea() {
    console.log(this.newTarea);
    // TODO: Add loading controller
    this.tareaService.crearTarea(this.newTarea);
  }

  guardarTarea(t: Tarea) {
    console.log(`Guardando tarea: ${t}`);
  }
}
*/