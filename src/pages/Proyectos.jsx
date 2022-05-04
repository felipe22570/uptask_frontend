import React, { useEffect } from "react";
import PreviewProyecto from "../components/PreviewProyecto";
import useProyectos from "../hooks/useProyectos";

// let socket;

const Proyectos = () => {
   const { proyectos } = useProyectos();

   // useEffect(() => {
   //    socket = io(import.meta.env.VITE_BACKEND_URL);

   //    socket.emit("prueba");
   // });

   return (
      <>
         <h1 className="text-4xl font-black">Proyectos</h1>

         <div className="bg-white shadow-lg mt-10 rounded-lg">
            {proyectos.length ? (
               proyectos.map((proyecto) => (
                  <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
               ))
            ) : (
               <p className="mt-5 text-center text-gray-600 uppercase">No hay proyectos aún</p>
            )}
         </div>
      </>
   );
};

export default Proyectos;
