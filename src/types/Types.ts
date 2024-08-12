// Definido tipo Dato
export interface Dato {
  id: number;
  cantidad: number;
  concepto: string;
  users: string[];
}

// Definido tipo Persona
export interface Persona {
  id: number;
  nombre: string;
  datos: Dato[];
}

// Definido tipo Error
export interface ResponseMsg {
  message: string;
  status: string;
}

// Enum para tipos de errores
export enum ResponseTypes {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
}
