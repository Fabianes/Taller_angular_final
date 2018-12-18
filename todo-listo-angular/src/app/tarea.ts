export enum EstadoTarea {
    Creada
    , EnProceso
    , Terminada
}

export function estado2str(e: EstadoTarea): string {
    switch (e) {
      case EstadoTarea.Creada: return 'Creada';
      case EstadoTarea.EnProceso: return 'En Proceso';
      case EstadoTarea.Terminada: return 'Terminada';
    }
  }

export class Tarea {
    id: number;
    titulo: string;
    descripcion;
    estado: EstadoTarea;
    latitud: number;
    longitud: number;
    fecha_inicio: Date;
    fecha_termino: Date;

    constructor(id, titulo, descripcion, estado = EstadoTarea.Creada, latitud, longitud,fecha_inicio,fecha_termino) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado;
        this.latitud = latitud;
        this.longitud = longitud;
        this.fecha_inicio = fecha_inicio;
        this.fecha_termino = fecha_termino;
    }

    toString() {
        return `Tarea #${this.id}: ${this.titulo}`;
    }
}
