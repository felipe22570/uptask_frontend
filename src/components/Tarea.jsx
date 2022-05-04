import React from "react";
import { formatearFecha } from "../helpers/formatearfecha";
import useAdmin from "../hooks/useAdmin";
import useProyectos from "../hooks/useProyectos";

const Tarea = ({ tarea }) => {
   const { setTarea, setModal, modalEliminarTarea, setModalEliminarTarea, completarTarea } =
      useProyectos();

   const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea;

   const admin = useAdmin();

   console.log(tarea);

   return (
      <div className="border-b p-5 flex justify-between items-center">
         <div className="">
            <p className="mb-2 text-xl">{nombre}</p>
            <p className="mb-1 text-sm text-gray-600">{descripcion}</p>
            <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
            <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
            {estado && (
               <p className="text-green-600 font-bold">Completado por: {tarea.completado.nombre}</p>
            )}
         </div>
         <div className="flex flex-col md:flex-row gap-2">
            {admin && (
               <button
                  className="bg-indigo-600 px-4 py-3 text-white font-bold text-sm rounded-lg"
                  onClick={() => {
                     setTarea(tarea), setModal(true);
                  }}
               >
                  Editar
               </button>
            )}

            <button
               className={`${
                  estado ? "bg-sky-600" : "bg-gray-600"
               } px-4 py-3 text-white font-bold text-sm rounded-lg`}
               onClick={() => completarTarea(_id)}
            >
               {estado ? "Completa" : "Incompleta"}
            </button>

            {admin && (
               <button
                  className="bg-red-600 px-4 py-3 text-white font-bold text-sm rounded-lg"
                  onClick={() => {
                     setTarea(tarea), setModalEliminarTarea(true);
                  }}
               >
                  Eliminar
               </button>
            )}
         </div>
      </div>
   );
};

export default Tarea;
