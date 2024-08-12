import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

// Types
import { type Persona, ResponseTypes } from "../types/Types";

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
  const [usuariosDropdownVisible, setUsuariosDropdownVisible] =
    useState<boolean>(false);
  const [inputPersona, setInputPersona] = useState<string>("");
  const [inputCantidad, setInputCantidad] = useState<string>("");
  const [inputConcepto, setInputConcepto] = useState<string>("");
  const [usuarios, setUsuarios] = useState<string[]>([]);

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
   * Función que al clicar en un usuario de la lista
   * inserta el nombre en el string de usuarios a los que va dirigido el gasto
   * @param nombre
   */
  const handleClickUsuarioLista = (nombre: string) => {
    if(!usuarios.includes(nombre)) {
      setUsuarios((prevState) => [...prevState, nombre]);
    } else {
      setUsuarios((prevState) => prevState.filter((u) => u !== nombre));
    }
  };

  /**
   * Función que se ejecuta al enviar el formulario
   * @param event
   */
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const usuariosADividir = usuarios.includes(inputPersona) ? usuarios : [...usuarios, inputPersona];

    const dato = {
      personaName: capitalizeName(inputPersona),
      datos: [
        {
          id: Date.now(),
          cantidad: Number(inputCantidad),
          concepto: inputConcepto,
          users: usuariosADividir,
        },
      ],
    };

    const response = await addDato(dato);
    resetFormulario();
    response.status == ResponseTypes.SUCCESS
      ? toast.success(response.message)
      : toast.error("Error al añadir el gasto");
  };

  /**
   * Cierra el dropdown del listado de personas al hacer click fuera de él
   */
  useEffect(() => {
    function handleClickOutsideDropdown(event: MouseEvent) {
      const dropdown = document.getElementById("wrapper-personas");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setPersonasDropdownVisible(false);
      }
    }

    document.addEventListener("click", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("click", handleClickOutsideDropdown);
    };
  });

  /**
   * Cierra el dropdown del listado de usuarios al hacer click fuera de él
   */
  useEffect(() => {
    function handleClickOutsideDropdown(event: MouseEvent) {
      const dropdown = document.getElementById("wrapper-usuarios");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setUsuariosDropdownVisible(false);
      }
    }

    document.addEventListener("click", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("click", handleClickOutsideDropdown);
    };
  });


  /**
   * Effect hook que se ejecuta al cambiar el número de personas de la cuenta
   * rellena el array de usuarios destinatarios del gasto
   */
  useEffect(() => {
    const usuariosArray:string[] = [];
    personas?.forEach((p: Persona) => {
      usuariosArray.push(p.nombre);
    })
    setUsuarios(usuariosArray);
  }, [personas]);

  return (
    <>
      <Toaster
        richColors
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast: toasterStyles.toasterCustom,
            error: toasterStyles.error,
            success: toasterStyles.success,
            warning: toasterStyles.warning,
            info: toasterStyles.info,
          },
        }}
      />
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto max-w-6xl mb-10 p-2 flex flex-col md:flex-row gap-4 items-center justify-center"
      >
        <div className="w-full md:w-8/12 flex flex-col gap-2">
          <div className="flex gap-3">
            <div id="wrapper-personas" className="w-1/2 relative">
              <label htmlFor="input-persona" className="text-sm font-regular mb-2">
                Pagado por
              </label>
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
                    className={
                      personasDropdownVisible
                        ? "transition ease-in-out duration-300 rotate-180"
                        : "transition ease-in-out duration-300"
                    }
                  >
                    <path d="M7 10L12 15L17 10H7Z" />
                  </svg>
                </span>
              </span>
              {personas?.length > 0 && personasDropdownVisible && (
                <div className="absolute bg-slate-50 dark:bg-zinc-800 w-full rounded-md shadow border border-t-0 flex flex-col gap-1">
                  {personas.map((p: Persona) => {
                    if (
                      p.nombre
                        ?.toLowerCase()
                        .includes(inputPersona.toLowerCase())
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
              <label htmlFor="input-cantidad" className="text-sm font-regular mb-2">
                Cantidad
              </label>
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
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-8/12">
              <label htmlFor="input-descripcion" className="text-sm font-regular mb-2">
                Descripción
              </label>
              <span className="flex bg-slate-50 dark:bg-zinc-800 justify-between py-1 px-2 border rounded-md md:text-md shadow">
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
            <div id="wrapper-usuarios" className="w-full md:w-4/12 relative">
              <label htmlFor="input-implicados" className="text-sm font-regular mb-2">
                Dividir entre
              </label>
              <span className="flex bg-slate-50 dark:bg-zinc-800 justify-between w-full py-1 px-2 border rounded-md md:text-md shadow">
                <input
                  type="text"
                  placeholder="Dividir entre"
                  id="input-implicados"
                  name="input-implicados"
                  value={usuarios.join(", ")}
                  className="grow bg-transparent focus-visible:outline-0"
                  onFocus={() => setUsuariosDropdownVisible(true)}
                />
                <span
                  className="cursor-pointer"
                  onClick={() =>
                    setUsuariosDropdownVisible((prevState) => !prevState)
                  }
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className={
                      usuariosDropdownVisible
                        ? "transition ease-in-out duration-300 rotate-180"
                        : "transition ease-in-out duration-300"
                    }
                  >
                    <path d="M7 10L12 15L17 10H7Z" />
                  </svg>
                </span>
              </span>
              {personas?.length > 0 && usuariosDropdownVisible && (
                <ul className="absolute bg-slate-50 dark:bg-zinc-800 w-full rounded-md shadow border border-t-0 flex flex-col gap-1">
                  {personas.map((p: Persona) => {
                    if (
                      p.nombre
                        ?.toLowerCase()
                        .includes(inputPersona.toLowerCase())
                    ) {
                      return (
                        <li
                          key={p.nombre}
                          onClick={() => handleClickUsuarioLista(p.nombre)}
                          className="flex justify-between items-center rounded-md w-full py-1 px-2 cursor-pointer hover:bg-slate-200 dark:hover:bg-zinc-700"
                        >
                          <span className="grow">{p.nombre}</span>
                          {usuarios.includes(p.nombre) && (
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              className="w-4 h-4"
                            >
                              <path
                                d="M20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20C9.87827 20 7.84344 19.1571 6.34315 17.6569C4.84285 16.1566 4 14.1217 4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4C12.76 4 13.5 4.11 14.2 4.31L15.77 2.74C14.61 2.26 13.34 2 12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12M7.91 10.08L6.5 11.5L11 16L21 6L19.59 4.58L11 13.17L7.91 10.08Z"
                                fill="black"
                              />
                            </svg>
                          )}
                        </li>
                      );
                    }
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="w-6/12 md:w-4/12 max-w-52">
          <button
            type="submit"
            className="w-full text-white text-center rounded-md py-2 md:py-3 text-md font-semibold bg-blue-500 hover:bg-blue-700 active:bg-blue-900 transition ease-in-out duration-150 shadow hover:shadow-md"
          >
            Añadir gasto
          </button>
        </div>
      </form>
    </>
  );
};

export default Formulario;
