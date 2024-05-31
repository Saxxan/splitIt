import React from 'react'

// Context
import { useSplitStore } from '../store/splitStore'

// Types
import { type Persona } from '../types/Types'
import PersonaResume from './PersonaResume'

const ListadoPersonas = () => {
    const { personas } = useSplitStore(state => state)

  return (
    <ul className="list-none flex flex-col gap-2 lg:gap-3 w-full mx-auto p-2" style={{ maxWidth: '997.33px' }}>
        {personas.map((p: Persona, index) => <PersonaResume key={index} persona={p} />)}
    </ul>
  )
}

export default ListadoPersonas