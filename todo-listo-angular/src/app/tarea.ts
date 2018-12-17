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

    constructor(id, titulo, descripcion, estado = EstadoTarea.Creada, latitud, longitud) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado;
        this.latitud = latitud;
        this.longitud = longitud;
    }

    toString() {
        return `Tarea #${this.id}: ${this.titulo}`;
    }
}
