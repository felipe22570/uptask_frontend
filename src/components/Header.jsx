import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useProyectos from "../hooks/useProyectos";
import Busqueda from "./Busqueda";

const Header = () => {
   const { setBuscador, cerrarSesion } = useProyectos();
   const { cerrarSesionAuth } = useAuth();

   const handleCerrarSesion = () => {
      cerrarSesion();
      cerrarSesionAuth();

      localStorage.removeItem("token");
   };

   return (
      <header className="px-4 py-5 bg-white border-b">
         <div className="md:flex md:justify-between">
            <h2 className="text-3xl text-sky-600 font-black text-center mb-5 md:mb-0">UpTask</h2>

            <div className="flex flex-col md:flex-row items-center gap-4">
               <button
                  type="button"
                  className="font-bold flex gap-2 shadow px-5 py-3 border"
                  onClick={() => setBuscador(true)}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-6 w-6"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                     strokeWidth={2}
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                     />
                  </svg>
                  Buscar proyecto
               </button>
               <Link to={"/proyectos"} className="font-bold uppercase">
                  Proyectos
               </Link>

               <button
                  type="button"
                  className="text-white text-sm bg-sky-600 p-3 rounded-md font-bold"
                  onClick={handleCerrarSesion}
               >
                  Cerrar sesión
               </button>
            </div>

            <Busqueda />
         </div>
      </header>
   );
};

export default Header;
