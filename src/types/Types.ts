// Definido tipo Dato
export interface Dato {
  cantidad: number;
  concepto: string;
}

// Definido tipo Persona
export interface Persona {
  nombre: string;
  datos: Dato[];
}
