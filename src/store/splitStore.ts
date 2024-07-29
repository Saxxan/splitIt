import { create } from "zustand";

// Types
import { type Persona, type Dato } from "../types/Types";

interface SplitStoreState {
  personas: Persona[];
  addDato: (dato : {personaName: string, datos: Dato[]}) => void;
  removePersona: (persona: Persona) => void;
  editPersonaName: (id: number, personaName: string) => void;
  removeGasto: (persona: Persona, gasto: Dato) => void;
  editGasto: (persona: Persona, gasto: Dato) => void;
  calculateResult: () => void;
  resetCount: () => void;
}

export const useSplitStore = create<SplitStoreState>((set, get) => ({
  personas: [
    // {
    //   nombre: "Salva",
    //   datos: [{
    //     cantidad: 10,
    //     concepto: "Cervezas"
    //   }],
    // },
    // {
    //   nombre: "Paloma",
    //   datos: [
    //     {
    //       cantidad: 10,
    //       concepto: "Cervezas",
    //     },
    //     {
    //       cantidad: 20,
    //       concepto: "Pizza",
    //     },
    //   ],
    // },
  ],

  addDato: (dato) => {
    const currentPersonas = get().personas;
    if (
      currentPersonas.length > 0 &&
      currentPersonas.findIndex((p: Persona) => p.nombre === dato.personaName) > -1
    ) {
      set((state: any) => ({
        personas: state.personas.map((p: Persona) =>
          p.nombre === dato.personaName
            ? { ...p, datos: [...p.datos, dato.datos[0]] }
            : p
        ),
      }));
    } else {
      const newPersona = {
        id: Date.now(),
        nombre: dato.personaName,
        datos: dato.datos,
      };
      set((state: any) => ({ personas: [...state.personas, newPersona] }));
    }
  },

  removePersona: (persona) =>
    set((state: any) => ({
      personas: state.personas.filter((p: Persona) => p.id !== persona.id),
    })),

  editPersonaName: (id, personaName) =>
    set((state: any) => ({
      personas: state.personas.map((p: Persona) =>
        p.id === id ? { ...p, nombre: personaName } : p
      ),
    })),

  removeGasto: (persona, gasto) =>
    set((state: any) => ({
      personas: state.personas.map((p: Persona) =>
        p === persona ? { ...p, datos: p.datos.filter((g) => g.id !== gasto.id) } : p
      ),
    })),

  editGasto: (persona, gasto) =>
    set((state: any) => ({
      personas: state.personas.map((p: Persona) =>
        p === persona
          ? { ...p, datos: p.datos.map((g) => (g.id === gasto.id ? gasto : g)) }
          : p
      ),
    })),

  calculateResult: () => {},

  resetCount: () => set(() => ({ personas: [] })),
}));
