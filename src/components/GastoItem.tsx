import React, { useState } from 'react'
import { Toaster, toast } from 'sonner'

// Types
import { type Dato, type Persona } from '../types/Types'

// Context
import { useSplitStore } from "../store/splitStore";

// Styles
import tooltipStyles from '../styles/tooltips.module.css';
import toasterStyles from "../styles/toaster.module.css";

interface Props {
    dato: Dato,
    persona: Persona
}

const GastoItem: React.FC<Props> = ({dato, persona}) => {
    const [newDato, setNewDato] = useState<Dato>(dato);

    const {editGasto, removeGasto} = useSplitStore(state => state);

    const saveNewGasto = ():void => {
        editGasto(persona, newDato);
        toast.success("Gasto actualizado correctamente");
    }

    /**
     * Función que recibe el elemento HTML de la cantidad del gasto, de él saca el valor modificado,
     * lo cambia y lo envía al estado
     * @param target 
     */
    const handleChangeCantidad = (target:HTMLInputElement):void => {
        setNewDato(prevState => ({...prevState, cantidad: Number(target.value)}));
    }

    /**
     * Función que recibe el elemento HTML del concepto del gasto, de él saca el valor modificado,
     * lo cambia y lo envía al estado
     * @param target 
     */
    const handleChangeConcepto = (target:HTMLInputElement):void => {
        setNewDato(prevState => ({...prevState, concepto: target.value}));
    }

    /**
     * Eliminar el gasto del estado
     */
    const handleClickRemoveGastoButton = () => {
        removeGasto(persona, newDato);
        toast.success('Gasto eliminado correctamente');
    }

  return (
    <li className="flex items-center justify-between py-1 px-4 rounded-md hover:bg-emerald-600">
      <Toaster
        richColors
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast: toasterStyles.toasterCustom,
          },
        }}
      />
      <div className="flex gap-4 items-center grow">
        <div className="flex gap-1 items-center group">
          <span className="font-semibold">
            <input
              type="text"
              className="bg-transparent focus-visible:outline-0 focus:border-b pe-0.5 w-14 text-right"
              value={newDato.cantidad}
              onChange={(event) => handleChangeCantidad(event.target)}
              onBlur={saveNewGasto}
            />
            €
          </span>
        </div>
        <input
          type="text"
          className="bg-transparent focus-visible:outline-0 focus:border-b text-gray-100 grow"
          value={newDato.concepto}
          onChange={(event) => handleChangeConcepto(event.target)}
          onBlur={saveNewGasto}
        />
      </div>
      <button
        className={`hover:bg-red-600 dark:hover:bg-red-500 rounded p-0.5 flex items-center justify-center ${tooltipStyles.tooltip}`}
        data-tooltip="Eliminar gasto"
        onClick={handleClickRemoveGastoButton}
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
    </li>
  );
}

export default GastoItem