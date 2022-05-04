import React, { createContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import clientAxios from "../config/clientAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
   const [auth, setAuth] = useState({});
   const [loading, setLoading] = useState(true);

   const cerrarSesionAuth = () => {
      setAuth({});
   };

   useEffect(() => {
      const autenticarUsuario = async () => {
         const token = localStorage.getItem("token");

         if (!token) {
            setLoading(false);
            return;
         }

         const config = {
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${token}`,
            },
         };

         try {
            const { data } = await clientAxios("/usuarios/perfil", config);

            setAuth(data);
         } catch (error) {
            setAuth({});
         }

         setLoading(false);
      };

      autenticarUsuario();
   }, []);

   return (
      <AuthContext.Provider
         value={{
            auth,
            setAuth,
            loading,
            cerrarSesionAuth,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export { AuthProvider };

export default AuthContext;
