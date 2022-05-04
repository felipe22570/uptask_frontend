import React from "react";
import { Link } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const PreviewProyecto = ({ proyecto }) => {
   const { nombre, _id, cliente, creador } = proyecto;

   const { auth } = useAuth();

   const admin = useAdmin();

   return (
      <div className="border-b p-5 flex justify-between">
         <p className="">
            {nombre} <span className="text-sm text-gray-500"> {cliente}</span>
         </p>

         {auth._id !== creador && (
            <p className="p-1 text-xs rounded-lg text-white bg-green-500 font-bold">Colaborador</p>
         )}

         <Link to={`${_id}`} className="text-gray-600 hover:text-gray-800 text-sm font-bold">
            Ver proyecto
         </Link>
      </div>
   );
};

export default PreviewProyecto;
