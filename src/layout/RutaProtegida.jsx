import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";

const RutaProtegida = () => {
   const { auth, loading } = useAuth();

   if (loading) return <Spinner />;
   return (
      <>
         {auth.email ? (
            <div className="bg-gray-200 ">
               <Header />

               <div className="md:flex md:min-h-screen">
                  <Sidebar />
                  <main className="p-10 flex-1">
                     <Outlet />
                  </main>
               </div>
            </div>
         ) : (
            <Navigate to={"/"} />
         )}
      </>
   );
};

export default RutaProtegida;
