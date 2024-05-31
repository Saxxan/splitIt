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

// Definido el tipo del estado del contexto
export interface ContextState {
  personas: Persona[];
}

// Definido los tipos de acciones del estado
export type SplitAction =
  | { type: "ADD_PERSONA", payload: string}
  | { type: "REMOVE_PERSONA" }
  | { type: "EDIT_PERSONA" }
  | { type: "ADD_GASTO" }
  | { type: "REMOVE_GASTO" }
  | { type: "EDIT_GASTO" }
  | { type: "CALCULATE_RESULT" }
  | { type: "RESET_COUNT" };
