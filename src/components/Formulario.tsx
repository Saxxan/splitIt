import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

// Types
import { type Persona } from "../types/Types";

// Context
import { useSplitStore } from "../store/splitStore";

// Utils
import { capitalizeName } from "../utils/textUtils";

// Styles
import toasterStyles from "../styles/toaster.module.css";

const Formulario = () => {
  const { personas, addDato } = useSplitStore((state) => state);

  const [personasDropdownVisible, setPersonasDropdownVisible] =
    useState<boolean>(false);
  const [inputPersona, setInputPersona] = useState<string>("");
  const [inputCantidad, setInputCantidad] = useState<string>("");
  const [inputConcepto, setInputConcepto] = useState<string>("");

  /**
   * Función para poner el formulario vacío
   */
  const resetFormulario = () => {
    setInputCantidad("");
    setInputConcepto("");
    setInputPersona("");
  };

  /**
   * Función que al clicar en una persona de la lista
   * inserta el nombre como valor del input y cierra la lista
   * @param nombre
   */
  const handleClickPersonaLista = (nombre: string) => {
    setInputPersona(nombre);
    setPersonasDropdownVisible(false);
  };

  /**
   * Función que se ejecuta al enviar el formulario
   * @param event
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const dato = {
      personaName: capitalizeName(inputPersona),
      datos: [{ id: Date.now(), cantidad: Number(inputCantidad), concepto: inputConcepto }],
    };

    addDato(dato);
    toast.success("Gasto añadido correctamente");
    resetFormulario();
  };

  /**
   * Cierra el dropdown del listado de personas al hacer click fuera de él
   */
  useEffect(() => {
    function handleClickOutsideDropdown(event: MouseEvent) {
      const dropdown = document.getElementById("wrapper-persona");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setPersonasDropdownVisible(false);
      }
    }

    document.addEventListener("click", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("click", handleClickOutsideDropdown);
    };
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto max-w-6xl mb-10 p-2 flex flex-col md:flex-row gap-4 items-center justify-center"
    >
      <Toaster
        richColors
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast: toasterStyles.toasterCustom,
          },
        }}
      />
      
      <div className="w-full md:w-8/12 flex flex-col gap-3">
        <div className="flex gap-3">
          <div id="wrapper-persona" className="w-1/2 relative">
            <span className="flex bg-slate-50 dark:bg-zinc-800 justify-between w-full py-1 px-2 border rounded-md md:text-md shadow">
              <input
                type="text"
                placeholder="Persona"
                id="input-persona"
                name="input-persona"
                value={inputPersona}
                required
                className="grow bg-transparent focus-visible:outline-0"
                onChange={(event) => {
                  setInputPersona(event.target.value);
                }}
                onFocus={() => setPersonasDropdownVisible(true)}
              />
              <span
                className="cursor-pointer"
                onClick={() =>
                  setPersonasDropdownVisible((prevState) => !prevState)
                }
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className={personasDropdownVisible ? "rotate180" : ""}
                >
                  <path d="M7 10L12 15L17 10H7Z" />
                </svg>
              </span>
            </span>
            {personas?.length > 0 && personasDropdownVisible && (
              <div className="absolute bg-slate-50 dark:bg-zinc-800 w-full rounded-md shadow border border-t-0 flex flex-col gap-1">
                {personas.map((p: Persona) => {
                  if (
                    p.nombre?.toLowerCase().includes(inputPersona.toLowerCase())
                  ) {
                    return (
                      <span
                        key={p.nombre}
                        onClick={() => handleClickPersonaLista(p.nombre)}
                        className="block rounded-md w-full py-1 px-2 cursor-pointer hover:bg-slate-200 dark:hover:bg-zinc-700"
                      >
                        {p.nombre}
                      </span>
                    );
                  }
                })}
              </div>
            )}
          </div>
          <div className="w-1/2">
            <span className="flex bg-slate-50 dark:bg-zinc-800 justify-between w-full py-1 px-2 border rounded-md md:text-md shadow">
              <input
                type="number"
                id="input-cantidad"
                name="input-cantidad"
                placeholder="Cantidad"
                value={inputCantidad}
                required
                className="grow bg-transparent focus-visible:outline-0 pe-1"
                onChange={(event) => {
                  setInputCantidad(event.target.value);
                }}
              />
              <span>€</span>
            </span>
          </div>
        </div>
        <div>
          <span className="flex bg-slate-50 dark:bg-zinc-800 justify-between w-full py-1 px-2 border rounded-md md:text-md shadow">
            <input
              type="text"
              placeholder="Descripción"
              id="input-descripcion"
              name="input-descripcion"
              value={inputConcepto}
              className="grow bg-transparent focus-visible:outline-0"
              onChange={(event) => {
                setInputConcepto(event.target.value);
              }}
            />
          </span>
        </div>
      </div>
      <div className="w-6/12 md:w-4/12 max-w-52">
        <button
          type="submit"
          className="w-full text-white text-center rounded-md py-2 md:py-3 text-md font-semibold bg-blue-500 hover:bg-blue-700 active:bg-blue-900 transition ease-in-out duration-150 shadow hover:shadow-md"
        >
          Añadir
        </button>
      </div>
    </form>
  );
};

export default Formulario;
