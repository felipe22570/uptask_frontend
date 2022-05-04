import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clientAxios from "../config/clientAxios";
import useAuth from "../hooks/useAuth";

const Login = () => {
   const navigate = useNavigate();
   const { setAuth } = useAuth();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [alerta, setAlerta] = useState({});

   const handleSubmit = async (e) => {
      e.preventDefault();

      if ([email, password].includes("")) {
         setAlerta({
            msg: "Todos los campos son obligatorios",
            error: true,
         });
         return;
      }

      try {
         const { data } = await clientAxios.post("/usuarios/login", { email, password });

         localStorage.setItem("token", data.token);

         setAlerta({});

         setAuth(data);

         navigate("/proyectos");
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
            Inicia sesión y administra tus <span className="text-slate-700"> proyectos</span>
         </h1>

         <form className="my-8 bg-white shadow rounded-lg p-7 " onSubmit={handleSubmit}>
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
            <div className="my-5">
               <label htmlFor="" className="uppercase text-gray-600 block text-base font-bold">
                  Password
               </label>
               <input
                  type="password"
                  name=""
                  id=""
                  placeholder="Password de registro de registro"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>

            <input
               type="submit"
               value="Iniciar sesión"
               className="bg-sky-700 w-full py-3 text-white font-bold rounded cursor-pointer hover:bg-sky-800 transition-colors"
            />
         </form>

         {msg && <Alerta alerta={alerta} />}

         <nav className="lg:flex lg:justify-between">
            <Link to={"registrar"} className="block text-center my-5 text-slate-500 text-sm">
               No tienes una cuenta? Registrate
            </Link>
            <Link to={"forgot-password"} className="block text-center my-5 text-slate-500 text-sm">
               Olvidé mi password
            </Link>
         </nav>
      </>
   );
};

export default Login;
