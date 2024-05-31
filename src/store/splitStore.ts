import { create } from "zustand";

// Types
import { type Persona, type Dato } from "../types/Types";

interface SplitStoreState {
    personas: Persona[];
    addDato: (persona: Persona) => void;
    addPersona: (persona: Persona) => void;
    removePersona: (persona: Persona) => void;
    editPersona: (persona: Persona) => void;
    personaExist: (nombrePersona: string) => boolean;
    addGasto: (persona: Persona, gasto: Dato) => void;
    removeGasto: (persona: Persona, gasto: Dato) => void;
    editGasto: (persona: Persona, gasto: Dato) => void;
    calculateResult: () => void;
    resetCount: () => void;
}

export const useSplitStore = create<SplitStoreState>((set, get) => ({
  personas: [
    {
      nombre: 'Salva',
      datos: []
    }
  ],
  addDato: (persona) => {
    const currentPersonas = get().personas;
    if (currentPersonas.length > 0) {
      set((state: any) => ({
        personas: state.personas.forEach((p: Persona) => 
          p.nombre.toLowerCase === persona.nombre.toLowerCase ? {...p, datos: [...p.datos, persona.datos[0]]} : p
        )
      }))
    } else {
      set((state: any) => ({
        personas: [...state.personas, persona]
      }))
    }
  },

  addPersona: (persona) =>
    set((state: any) => ({})),

  removePersona: (persona) =>
    set((state: any) => ({ personas: state.personas.filter((p: Persona) => p !== persona) })),

  editPersona: (persona) =>
    set((state: any) => ({
      personas: state.personas.map((p: Persona) => (p === persona ? persona : p)),
    })),

  personaExist: (nombrePersona) => {
    const currentPersonas: Persona[] = get().personas;
    const personasExists: Persona[] = currentPersonas.filter((p: Persona) => p.nombre === nombrePersona);
    return personasExists.length > 0 ? true : false;
  },

  addGasto: (persona, gasto) =>
    set((state: any) => ({
      personas: state.personas.map((p: Persona) =>
        p === persona ? { ...p, datos: [...p.datos, gasto] } : p
      ),
    })),

  removeGasto: (persona, gasto) =>
    set((state: any) => ({
      personas: state.personas.map((p: Persona) =>
        p === persona ? { ...p, datos: p.datos.filter((g) => g !== gasto) } : p
      ),
    })),

  editGasto: (persona, gasto) =>
    set((state: any) => ({
      personas: state.personas.map((p: Persona) =>
        p === persona
          ? { ...p, datos: p.datos.map((g) => (g === gasto ? gasto : g)) }
          : p
      ),
    })),

  calculateResult: () => {},

  resetCount: () => set(() => ({ personas: [] })),
}));
