import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioProyecto = () => {
   const params = useParams();

   const { alerta, setAlerta, submitProyecto, proyecto } = useProyectos();

   const [id, setId] = useState(null);
   const [nombre, setNombre] = useState("");
   const [descripcion, setDescripcion] = useState("");
   const [fechaEntrega, setFechaEntrega] = useState("");
   const [cliente, setCliente] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();

      if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
         setAlerta({
            msg: "Todos los campos son obligatorios",
            error: true,
         });

         setTimeout(() => {
            setAlerta({});
         }, 3000);

         return;
      }

      await submitProyecto({
         id,
         nombre,
         descripcion,
         fechaEntrega,
         cliente,
      });

      setId(null);
      setNombre("");
      setDescripcion("");
      setFechaEntrega("");
      setCliente("");
   };

   useEffect(() => {
      if (params.id) {
         setId(params.id);
         setNombre(proyecto.nombre);
         setDescripcion(proyecto.descripcion);
         setFechaEntrega(proyecto.fechaEntrega?.split("T")[0]);
         setCliente(proyecto.cliente);
      } else {
      }
   }, [params]);

   const { msg } = alerta;

   return (
      <form onSubmit={handleSubmit} className="bg-white py-10 px-5 md:w-2/3 rounded-lg">
         <div className="mb-5">
            <label htmlFor="" className="text-gray-700 font-bold text-sm">
               Nombre Proyecto
            </label>
            <input
               type="text"
               className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
               placeholder="Nombre del proyecto"
               value={nombre}
               onChange={(e) => setNombre(e.target.value)}
            />
         </div>
         <div className="mb-5">
            <label htmlFor="" className="text-gray-700 font-bold text-sm">
               Descripción
            </label>
            <textarea
               className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
               placeholder="Descripción del proyecto"
               value={descripcion}
               onChange={(e) => setDescripcion(e.target.value)}
            />
         </div>
         <div className="mb-5">
            <label htmlFor="" className="text-gray-700 font-bold text-sm">
               Fecha de entrega
            </label>
            <input
               type="date"
               className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
               value={fechaEntrega}
               onChange={(e) => setFechaEntrega(e.target.value)}
            />
         </div>
         <div className="mb-5">
            <label htmlFor="" className="text-gray-700 font-bold text-sm">
               Nombre Cliente
            </label>
            <input
               type="text"
               className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
               placeholder="Cliente del proyecto"
               value={cliente}
               onChange={(e) => setCliente(e.target.value)}
            />
         </div>

         <input
            type="submit"
            value={id ? "Actualizar proyecto" : "Crear proyecto"}
            className="bg-sky-600 w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
         />

         {msg && <Alerta alerta={alerta} />}
      </form>
   );
};

export default FormularioProyecto;
