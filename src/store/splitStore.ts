import { create } from "zustand";

// Types
import { type Persona, type Dato } from "../types/Types";

interface SplitStoreState {
  personas: Persona[];
  addDato: (persona: Persona) => void;
  removePersona: (persona: Persona) => void;
  editPersona: (persona: Persona) => void;
  removeGasto: (persona: Persona, gasto: Dato) => void;
  editGasto: (persona: Persona, gasto: Dato) => void;
  calculateResult: () => void;
  resetCount: () => void;
}

export const useSplitStore = create<SplitStoreState>((set, get) => ({
  personas: [
    {
      nombre: "Salva",
      datos: [{
        cantidad: 10,
        concepto: "Cervezas"
      }],
    },
    {
      nombre: "Paloma",
      datos: [
        {
          cantidad: 10,
          concepto: "Cervezas",
        },
        {
          cantidad: 20,
          concepto: "Pizza",
        },
      ],
    },
  ],

  addDato: (persona) => {
    const currentPersonas = get().personas;
    if (
      currentPersonas.length > 0 &&
      currentPersonas.findIndex((p: Persona) => p.nombre.toLowerCase() === persona.nombre.toLowerCase()) >
        -1
    ) {
      set((state: any) => ({
        personas: state.personas.map((p: Persona) =>
          p.nombre.toLowerCase() === persona.nombre.toLowerCase()
            ? { ...p, datos: [...p.datos, persona.datos[0]] }
            : p
        ),
      }));
    } else {
      set((state: any) => ({ personas: [...state.personas, persona] }));
    }
  },

  removePersona: (persona) =>
    set((state: any) => ({
      personas: state.personas.filter((p: Persona) => p !== persona),
    })),

  editPersona: (persona) =>
    set((state: any) => ({
      personas: state.personas.map((p: Persona) =>
        p === persona ? persona : p
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
