import React from "react";
import useProyectos from "../hooks/useProyectos";

const Colaborador = ({ colaborador }) => {
   const { setModalEliminarColaborador, setColaborador } = useProyectos();

   const { nombre, email } = colaborador;

   return (
      <div className="border-b p-5 flex justify-between items-center">
         <div className="">
            <p>{nombre}</p>
            <p className="text-sm text-gray-500">{email}</p>
         </div>

         <div className="">
            <button
               type="button"
               className="bg-red-600 font-bold text-sm rounded-lg px-4 py-3 text-white"
               onClick={() => {
                  setColaborador(colaborador), setModalEliminarColaborador(true);
               }}
            >
               Eliminar
            </button>
         </div>
      </div>
   );
};

export default Colaborador;
