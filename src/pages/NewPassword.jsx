import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clientAxios from "../config/clientAxios";

const NewPassword = () => {
   const { token } = useParams();
   const navigate = useNavigate();

   const [password, setPassword] = useState("");
   const [tokenValido, setTokenValido] = useState(false);
   const [alerta, setAlerta] = useState({});

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (password.length < 6) {
         setAlerta({
            msg: "La contraseña es demasiado corta",
            error: true,
         });

         return;
      }

      try {
         const url = `/usuarios/forgot-password/${token}`;

         const { data } = await clientAxios.post(url, { password });

         setAlerta({
            msg: data.msg,
            error: false,
         });

         setTimeout(() => {
            navigate("/");
         }, 3000);
      } catch (error) {
         setAlerta({
            msg: error.response.data.msg,
            error: true,
         });
      }
   };

   useEffect(() => {
      const comprobarToken = async () => {
         try {
            const { data } = await clientAxios(`/usuarios/forgot-password/${token}`);

            setTokenValido(true);
         } catch (error) {
            setAlerta({
               msg: error.response.data.msg,
               error: true,
            });
         }
      };
      comprobarToken();
   }, []);

   const { msg } = alerta;

   return (
      <>
         <h1 className="text-sky-600 font-black text-4xl  ">
            Restablece tu password y no pierdas acceso a tus{" "}
            <span className="text-slate-700"> proyectos</span>
         </h1>

         {tokenValido && (
            <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
               <div className="my-5">
                  <label htmlFor="" className="uppercase text-gray-600 block text-base font-bold">
                     Nuevo Password
                  </label>
                  <input
                     type="password"
                     name=""
                     id=""
                     placeholder="Escribe tu nuevo password"
                     className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>

               <input
                  type="submit"
                  value="Guardar nuevo password"
                  className="bg-sky-700 w-full py-3 text-white font-bold rounded cursor-pointer hover:bg-sky-800 transition-colors"
               />
            </form>
         )}

         {msg && <Alerta alerta={alerta} />}
      </>
   );
};

export default NewPassword;
