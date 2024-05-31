import React, { useState } from 'react'

// Types
import { type Persona } from '../types/Types'

interface Props {
    persona: Persona
}

const PersonaResume: React.FC<Props> = ({persona}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <li className="text-white bg-emerald-400 rounded-md">
      <header className="py-0 px-3 bg-emerald-500 hover:bg-emerald-600 rounded-md">
        <button
          className="py-1 w-full flex justify-between items-center"
          onClick={() => setIsExpanded((prevState) => !prevState)}
        >
          <span className="font-semibold text-xl">{persona.nombre}</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={isExpanded ? "rotate180" : ""}
          >
            <path d="M7 10L12 15L17 10H7Z" />
          </svg>
        </button>
      </header>
      {isExpanded && (
        <div className="bg-emerald-400 rounded-b-md">
          <ul className="p-1 m-0 flex flex-col gap-1">
            {persona.datos.map((dato, index) => (
              <li key={index} className="py-1 px-4 rounded-md hover:bg-emerald-600">
                <div className="flex gap-2 items-center">
                  <span className="font-semibold">{dato.cantidad} €</span>
                  <span className="text-gray-100">{dato.concepto}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default PersonaResume