import React from 'react'

// Types
import { type Persona } from '../types/Types'

interface Props {
    persona: Persona
}

const PersonaResume: React.FC<Props> = ({persona}) => {
  return (
    <li>
        {persona.nombre}
    </li>
  )
}

export default PersonaResume