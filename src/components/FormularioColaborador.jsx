import React, { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioColaborador = () => {
   const { alerta, setAlerta, submitColaborador } = useProyectos();

   const [email, setEmail] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (email === "") {
         setAlerta({
            msg: "El email es obligatorio",
            error: true,
         });

         return;
      }

      await submitColaborador(email);
   };

   const { msg } = alerta;

   return (
      <form className="bg-white px-10 py-5 md:w-1/2 rounded-md shadow" onSubmit={handleSubmit}>
         <div className="mb-5">
            <label htmlFor="" className="text-gray-700 font-bold text-sm">
               Email del colaborador
            </label>
            <input
               type="email"
               placeholder="Email del usuario"
               className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
         </div>

         <input
            type="submit"
            value="Buscar colaborador"
            className="bg-sky-400 hover:bg-sky-600 w-full font-bold p-3 text-white cursor-pointer transition-colors rounded text-sm"
         />

         {msg && <Alerta alerta={alerta} />}
      </form>
   );
};

export default FormularioColaborador;
