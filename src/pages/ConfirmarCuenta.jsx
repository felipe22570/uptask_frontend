import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clientAxios from "../config/clientAxios";

const ConfirmarCuenta = () => {
   const [alerta, setAlerta] = useState({});
   const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

   const { id } = useParams();
   useEffect(() => {
      const confirmarCuenta = async () => {
         try {
            const url = `/usuarios/confirmar/${id}`;

            const { data } = await clientAxios(url);

            setAlerta({
               msg: data.msg,
               error: false,
            });

            setCuentaConfirmada(true);
         } catch (error) {
            setAlerta({
               msg: error.response.data.msg,
               error: true,
            });
         }
      };

      confirmarCuenta();
   }, []);

   const { msg } = alerta;

   return (
      <>
         <h1 className="text-sky-600 font-black text-4xl  ">
            Confirma tu cuenta y comienza a crear tus{" "}
            <span className="text-slate-700"> proyectos</span>
         </h1>

         <div>
            {msg && <Alerta alerta={alerta} />}
            {cuentaConfirmada && (
               <Link to={"/"} className="block text-center my-5 text-slate-500 text-sm">
                  Inicia sesión
               </Link>
            )}
         </div>
      </>
   );
};

export default ConfirmarCuenta;
