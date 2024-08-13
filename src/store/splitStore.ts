import { create } from "zustand";

// Types
import { type Persona, type Dato, type ResponseMsg, ResponseTypes } from "../types/Types";

interface SplitStoreState {
  personas: Persona[];
  addPersonas: (personas: string[]) => void;
  addDato: (dato : {personaName: string, datos: Dato[]}) => ResponseMsg;
  removePersona: (persona: Persona) => ResponseMsg;
  editPersonaName: (id: number, personaName: string) => ResponseMsg;
  removeGasto: (persona: Persona, gasto: Dato) => ResponseMsg;
  editGasto: (persona: Persona, gasto: Dato) => ResponseMsg;
  calculateResult: () => void;
  resetCount: () => void;
}

export const useSplitStore = create<SplitStoreState>((set, get) => ({
  personas: [],

  addPersonas: (personas) => {
    const arrayNewPersonas: Persona[] = [];
    console.log(personas);
    personas.forEach((p) => {
      const personaStructure = {
        id: Date.now(),
        nombre: p.toLowerCase(),
        datos: [],
      }
      arrayNewPersonas.push(personaStructure);
    })
    set((state: any) => ({ personas: [...state.personas, ...arrayNewPersonas] }));
  },

  addDato: (dato) => {
    const currentPersonas = get().personas;
    if (
      currentPersonas.length > 0 &&
      currentPersonas.findIndex((p: Persona) => p.nombre === dato.personaName) >
        -1
    ) {
      set((state: any) => ({
        personas: state.personas.map((p: Persona) =>
          p.nombre === dato.personaName
            ? { ...p, datos: [...p.datos, dato.datos[0]] }
            : p
        ),
      }));
      return {
        message: "Gasto añadido correctamente",
        status: ResponseTypes.SUCCESS,
      };
    } else {
      const newPersona = {
        id: Date.now(),
        nombre: dato.personaName,
        datos: dato.datos,
      };
      set((state: any) => ({ personas: [...state.personas, newPersona] }));
      return {
        message: "Persona y gasto añadidos correctamente",
        status: ResponseTypes.SUCCESS,
      };
    }
  },

  removePersona: (persona) => {
    set((state: any) => ({
      personas: state.personas.filter((p: Persona) => p.id !== persona.id),
    }));
    return {
      message: "Persona eliminada correctamente",
      status: ResponseTypes.SUCCESS,
    };
  },

  editPersonaName: (id, personaName) => {
    set((state: any) => ({
      personas: state.personas.map((p: Persona) =>
        p.id === id ? { ...p, nombre: personaName } : p
      ),
    }));
    return {
      message: "Nombre de persona modificado correctamente",
      status: ResponseTypes.SUCCESS,
    };
  },

  removeGasto: (persona, gasto) => {
    const currentPersonas = get().personas;
    const foundPersona = currentPersonas.find((p: Persona) => p === persona);

    if (foundPersona) {
      const updatedDatos = foundPersona.datos.filter(
        (g: Dato) => g.id !== gasto.id
      );

      if (updatedDatos.length === 0) {
        set((state: any) => ({
          personas: state.personas.filter((p: Persona) => p.id !== persona.id),
        }));
        return {
          message: "Gasto y persona eliminados correctamente",
          status: ResponseTypes.SUCCESS,
        };
      } else {
        set((state: any) => ({
          personas: state.personas.map((p: Persona) =>
            p === persona ? { ...p, datos: updatedDatos } : p
          ),
        }));
        return {
          message: "Gasto eliminado correctamente",
          status: ResponseTypes.SUCCESS,
        };
      }
    } else {
      return { message: "Persona no encontrada", status: ResponseTypes.ERROR };
    }
  },

  editGasto: (persona, gasto) => {
    set((state: any) => ({
      personas: state.personas.map((p: Persona) =>
        p === persona
          ? { ...p, datos: p.datos.map((g) => (g.id === gasto.id ? gasto : g)) }
          : p
      ),
    }))
    return {
      message: "Gasto modificado correctamente",
      status: ResponseTypes.SUCCESS,
    };
  },

  calculateResult: () => {},

  resetCount: () => set(() => ({ personas: [] })),
}));
