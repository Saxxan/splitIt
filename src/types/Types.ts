// Definido tipo Dato
export interface Dato {
  id: number;
  cantidad: number;
  concepto: string;
}

// Definido tipo Persona
export interface Persona {
  id: number;
  nombre: string;
  datos: Dato[];
}
