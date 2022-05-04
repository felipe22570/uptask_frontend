import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clientAxios from "../config/clientAxios";

const Register = () => {
   const [nombre, setNombre] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [repetirPassword, setRepetirPassword] = useState("");
   const [alerta, setAlerta] = useState({});

   const handleSubmit = async (e) => {
      e.preventDefault();

      if ([nombre, email, password, repetirPassword].includes("")) {
         setAlerta({
            msg: "Todos los campos son obligatorios",
            error: true,
         });

         return;
      }

      if (password !== repetirPassword) {
         setAlerta({
            msg: "Los passwords no son iguales",
            error: true,
         });

         return;
      }

      setAlerta({});

      try {
         const { data } = await clientAxios.post("/usuarios", {
            nombre,
            email,
            password,
         });

         setAlerta({
            msg: data.msg,
            error: false,
         });

         setNombre("");
         setEmail("");
         setPassword("");
         setRepetirPassword("");
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
         <h1 className="text-sky-600 font-black text-4xl  text-center ">
            Crea tu cuenta y administra tus <span className="text-slate-700"> proyectos</span>
         </h1>

         <form className="my-10 bg-white shadow rounded-lg p-5 " onSubmit={handleSubmit}>
            <div className="my-5">
               <label htmlFor="" className="uppercase text-gray-600 block text-base font-bold">
                  Nombre
               </label>
               <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Tu nombre"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
               />
            </div>
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
            <div className="my-5">
               <label htmlFor="" className="uppercase text-gray-600 block text-base font-bold">
                  Repetir password
               </label>
               <input
                  type="password"
                  name=""
                  id=""
                  placeholder="Repetir tu password"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={repetirPassword}
                  onChange={(e) => setRepetirPassword(e.target.value)}
               />
            </div>

            <input
               type="submit"
               value="Crear cuenta"
               className="bg-sky-700 w-full py-3 text-white font-bold rounded cursor-pointer hover:bg-sky-800 transition-colors"
            />
         </form>

         {msg && <Alerta alerta={alerta} />}

         <nav className="lg:flex lg:justify-between">
            <Link to={"/"} className="block text-center my-5 text-slate-500 text-sm">
               Ya tienes una cuenta? Inicia sesión
            </Link>
         </nav>
      </>
   );
};

export default Register;
