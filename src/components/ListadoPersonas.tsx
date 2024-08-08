import React, { useState, useEffect } from "react";

// Context
import { useSplitStore } from "../store/splitStore";

// Types
import { type Persona } from "../types/Types";
import PersonaResume from "./PersonaResume";

const ListadoPersonas = () => {
  const { personas, resetCount } = useSplitStore((state) => state);

  const [currentPersonas, setCurrentPersonas] = useState<Persona[]>(personas);

  /**
   * Effect hook que se ejecuta cuando cambia el estado de personas
   */
  useEffect(() => {
    setCurrentPersonas(personas);
  }, [personas]);

  return (
    <>
      <ul
        className="list-none flex flex-col gap-2 lg:gap-3 w-full mx-auto p-2 mb-10"
        style={{ maxWidth: "997.33px" }}
      >
        {currentPersonas?.map((p: Persona, index) =>
          p.datos?.length > 0 ? <PersonaResume key={index} persona={p} /> : null
        )}
      </ul>
      {currentPersonas?.length > 0 && (
        <div className="flex gap-6 justify-center items-center">
          {currentPersonas.length > 1 && (
            <button className="w-fit text-white text-center rounded-md py-2 md:py-3 px-6 text-md font-semibold bg-blue-500 hover:bg-blue-700 active:bg-blue-900 transition ease-in-out duration-150 shadow hover:shadow-md">
              Calcular resultado
            </button>
          )}
          <button
            type="button"
            className="text-red-600 dark:text-red-500 hover:underline w-fit"
            onClick={resetCount}
          >
            Reiniciar cuenta
          </button>
        </div>
      )}
    </>
  );
};

export default ListadoPersonas;
