import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Colaborador from "../components/Colaborador";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import ModalFormTarea from "../components/ModalFormTarea";
import Tarea from "../components/Tarea";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import useProyectos from "../hooks/useProyectos";
import io from "socket.io-client";
import Spinner from "../components/Spinner";

let socket;

const Proyecto = () => {
   const { id } = useParams();
   const {
      obtenerProyecto,
      proyecto,
      loading,
      modal,
      setModal,
      setTarea,
      submitTareasProyectos,
      eliminarTareaProyecto,
      actualizarTareaProyecto,
      cambiarEstadoTarea,
   } = useProyectos();
   const { auth } = useAuth();

   const admin = useAdmin();

   const { nombre } = proyecto;

   useEffect(() => {
      obtenerProyecto(id);
   }, []);

   useEffect(() => {
      socket = io(import.meta.env.VITE_BACKEND_URL);
      socket.emit("abrir proyecto", id);
   }, []);

   useEffect(() => {
      socket.on("tarea agregada", (tareaNueva) => {
         if (tareaNueva.proyecto === proyecto._id) {
            submitTareasProyectos(tareaNueva);
         }
      });

      socket.on("tarea eliminada", (tareaEliminada) => {
         if (tareaEliminada.proyecto === proyecto._id) {
            eliminarTareaProyecto(tareaEliminada);
         }
      });

      socket.on("tarea actualizada", (tareaActualizada) => {
         if (tareaActualizada.proyecto._id === proyecto._id) {
            actualizarTareaProyecto(tareaActualizada);
         }
      });

      socket.on("estado actualizado", (nuevoEstado) => {
         if (nuevoEstado.proyecto._id === proyecto._id) {
            cambiarEstadoTarea(nuevoEstado);
         }
      });
   });

   return loading ? (
      <Spinner />
   ) : (
      <>
         <div className="flex justify-between">
            <h1 className="font-black text-3xl">{nombre}</h1>

            {admin && (
               <div className="flex items-center gap-2 text-gray-400 hover:text-black">
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
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                     />
                  </svg>

                  <Link to={`/proyectos/editar/${id}`} className="font-bold">
                     Editar
                  </Link>
               </div>
            )}
         </div>

         {admin && (
            <button
               type="button"
               className="text-sm mt-5 px-5 py-3 w-full flex gap-4 items-center justify-center md:w-auto rounded-lg font-bold bg-sky-400 text-white text-center"
               onClick={() => {
                  setModal(true), setTarea({});
               }}
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
                     d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
               </svg>
               Nueva tarea
            </button>
         )}

         <p className="font-bold text-xl mt-10">Tareas del Proyecto</p>
         <div className="bg-white shadow mt-10 rounded-lg">
            {proyecto.tareas?.length ? (
               proyecto.tareas?.map((tarea) => <Tarea key={tarea._id} tarea={tarea} />)
            ) : (
               <p className="text-center py-10 my-5">No hay tareas en este proyecto</p>
            )}
         </div>

         {admin && (
            <>
               <div className="flex items-center justify-between mt-10">
                  <p className="font-bold text-xl ">Colaboradores</p>
                  <Link
                     to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                     className="text-gray-400 font-bold hover:text-black"
                  >
                     Añadir
                  </Link>
               </div>

               <div className="bg-white shadow mt-10 rounded-lg">
                  {proyecto.colaboradores?.length ? (
                     proyecto.colaboradores?.map((colaborador) => (
                        <Colaborador key={colaborador._id} colaborador={colaborador} />
                     ))
                  ) : (
                     <p className="text-center py-10 my-5">No hay colaboradores en este proyecto</p>
                  )}
               </div>
            </>
         )}

         <ModalFormTarea />
         <ModalEliminarTarea />
         <ModalEliminarColaborador />
      </>
   );
};

export default Proyecto;
