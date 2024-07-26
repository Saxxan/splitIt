import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';

// Types
import { type Persona } from '../types/Types';

// Components
import GastoItem from './GastoItem';

// Context
import { useSplitStore } from "../store/splitStore";

// Styles
import toasterStyles from '../styles/toaster.module.css';
import tooltipStyles from '../styles/tooltips.module.css';

interface Props {
    persona: Persona
}

const PersonaResume: React.FC<Props> = ({persona}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const {removePersona, editPersona} = useSplitStore(state => state)
  const [personaName, setPersonaName] = useState<string>(persona.nombre)

  const handleClickRemovePersonaButton = () => {
    removePersona(persona);
    toast.success('Usuario eliminado correctamente')
  }

  return (
    <li className="text-white bg-emerald-400 rounded-md">
      <Toaster
        richColors
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast: toasterStyles.toasterCustom,
          },
        }}
      />
      <header className="py-0 px-3 bg-emerald-500 hover:bg-emerald-600 rounded-md">
        <button
          className="py-1 w-full flex justify-between items-center"
          onClick={() => setIsExpanded((prevState) => !prevState)}
        >
          <div className="flex items-center gap-1 group">
            <input
              className="font-semibold text-xl bg-transparent focus-visible:outline-0 focus:border-b max-w-fit"
              value={persona.nombre}
            />
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 w-4 h-4 invisible group-hover:visible"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ fill: "none" }}
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={isExpanded ? "rotate180" : ""}
            >
              <path d="M7 10L12 15L17 10H7Z" />
            </svg>
            <button
              className={`hover:bg-red-600 dark:hover:bg-red-500 rounded p-0.5 flex items-center justify-center ${tooltipStyles.tooltip}`}
              data-tooltip="Eliminar usuario"
              onClick={handleClickRemovePersonaButton}
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ fill: "none" }}
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        </button>
      </header>
      {isExpanded && (
        <div className="bg-emerald-400 rounded-b-md">
          <ul className="p-1 m-0 flex flex-col gap-1">
            {persona.datos.map((dato, index) => (
              <GastoItem key={index} dato={dato} persona={persona} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default PersonaResume