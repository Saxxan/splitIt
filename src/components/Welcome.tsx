// Dependencies
import React, { useState } from "react";

// Styles
import tooltipStyles from "../styles/tooltips.module.css";

// Context
import { useSplitStore } from "../store/splitStore";

const Welcome = () => {
    const { addPersonas } = useSplitStore((state) => state);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [usuarios, setUsuarios] = useState<string[]>([]);
  const [nuevoUsuario, setNuevoUsuario] = useState<string>("");

  /**
   * Función que añade un nuevo usuario a la lista de usuarios que compondran la cuenta
   */
  const handleAddNewUser = () => {
    setUsuarios((prevState) => [...prevState, nuevoUsuario]);
    setNuevoUsuario("");
  };

  /**
   * Función que elimina el usuario seleccionado de la lista de usuarios
   */
  const handleRemoveUser = (user: string) => {
    setUsuarios((prevState) => prevState.filter((u) => u !== user));
  };

  /**
   * Función que cancela la creación de la cuenta poniendo todos los valores a 0
   */
  const handleCancelarCreacionCuenta = () => {
    setUsuarios([]);
    setNuevoUsuario("");
    setIsOpen(false);
  };

  /**
   * Función que crea la cuenta con los usuarios seleccionados
   */
  const handleCreateCount = () => {
    addPersonas(usuarios);
  }

  return (
    <div className="flex items-center justify-center">
      {isOpen ? (
        <div className="w-full max-w-64 p-4 bg-slate-100 dark:bg-zinc-700 shadow rounded-md flex flex-col">
          <h3 className="text-lg font-medium text-pretty mb-3">
            Usuarios a dividir la cuenta
          </h3>
          {usuarios.length > 0 && (
            <ul className="list-none mb-2">
              {usuarios.map((usuario, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between px-2 py-1 mb-1 rounded-md bg-slate-50 dark:bg-zinc-800 md:text-md shadow"
                >
                  <span>{usuario}</span>
                  <span
                    className={`cursor-pointer group ${tooltipStyles.tooltip}`}
                    data-tooltip="Eliminar usuario"
                    onClick={() => handleRemoveUser(usuario)}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path
                        d="M12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM14.59 8L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8Z"
                        className="group-hover:fill-red-600 dark:group-hover:fill-red-500"
                      />
                    </svg>
                  </span>
                </li>
              ))}
            </ul>
          )}
          <span className="flex bg-slate-50 dark:bg-zinc-800 justify-between w-full py-1 px-2 mb-3 border rounded-md md:text-md shadow">
            <input
              type="text"
              id="input-nuevousuario"
              name="input-nuevousuario"
              placeholder="Nuevo usuario"
              value={nuevoUsuario}
              onChange={(event) => setNuevoUsuario(event.target.value)}
              className="grow bg-transparent focus-visible:outline-0 pe-1"
            />
            <span
              className={`cursor-pointer group ${tooltipStyles.tooltip}`}
              data-tooltip="Añadir usuario"
              onClick={handleAddNewUser}
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM13 7H11V11H7V13H11V17H13V13H17V11H13V7Z"
                  className="group-hover:fill-green-600 dark:group-hover:fill-green-400"
                />
              </svg>
            </span>
          </span>
          {usuarios.length > 1 && (
            <a
              type="button"
              href="/count"
              className="w-full text-white text-center rounded-md py-2 md:py-3 text-md font-semibold bg-blue-500 hover:bg-blue-700 active:bg-blue-900 transition ease-in-out duration-150 shadow hover:shadow-md"
              onClick={handleCreateCount}
            >
              Crear cuenta
            </a>
          )}
          <button
            type="button"
            className="text-red-600 dark:text-red-500 hover:underline w-fit text-center mx-auto my-2 md:my-3"
            onClick={handleCancelarCreacionCuenta}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="w-full max-w-64 text-white text-center rounded-md py-2 md:py-3 text-md font-semibold bg-blue-500 hover:bg-blue-700 active:bg-blue-900 transition ease-in-out duration-150 shadow hover:shadow-md"
          onClick={() => setIsOpen(true)}
        >
          Crear nueva cuenta de gastos
        </button>
      )}
    </div>
  );
};

export default Welcome;
