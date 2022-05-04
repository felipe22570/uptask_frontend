import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clientAxios from "../config/clientAxios";

const ForgotPassword = () => {
   const [email, setEmail] = useState("");
   const [alerta, setAlerta] = useState({});

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (email === "" || email.length < 6) {
         setAlerta({
            msg: "El email es obligatorio",
            error: true,
         });

         return;
      }

      try {
         const { data } = await clientAxios.post(`/usuarios/forgot-password`, { email });

         setAlerta({
            msg: data.msg,
            error: false,
         });
      } catch (error) {
         setAlerta({
            msg: error.response.data.msg,
            error: true,
         });
      }
   };

   const { msg } = alerta;

   return (
      <>
         <h1 className="text-sky-600 font-black text-4xl text-center ">
            Recupera tu acceso y no pierdas tus <span className="text-slate-700"> proyectos</span>
         </h1>

         <form className="my-10 bg-white shadow rounded-lg p-10 " onSubmit={handleSubmit}>
            <div className="my-5">
               <label htmlFor="" className="uppercase text-gray-600 block text-base font-bold">
                  Email
               </label>
               <input
                  type="email"
                  name=""
                  id=""
                  placeholder="Email de registro"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>

            <input
               type="submit"
               value="Enviar instrucciones"
               className="bg-sky-700 w-full py-3 text-white font-bold rounded cursor-pointer hover:bg-sky-800 transition-colors"
            />
         </form>

         {msg && <Alerta alerta={alerta} />}
      </>
   );
};

export default ForgotPassword;
